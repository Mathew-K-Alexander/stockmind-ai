import React, { useState, useRef, useEffect } from 'react';
import { Plus, ArrowRight, TrendingUp, Search, Brain, Target, Lightbulb } from 'lucide-react';

interface ResearchNode {
  id: string;
  title: string;
  type: 'stock' | 'question' | 'insight' | 'analysis';
  content: string;
  x: number;
  y: number;
  connections: string[];
  confidence: number;
}

interface ConceptMapProps {
  nodes: ResearchNode[];
  onNodeClick: (node: ResearchNode) => void;
  onAddNode: (x: number, y: number) => void;
}

export const ConceptMap: React.FC<ConceptMapProps> = ({ nodes, onNodeClick, onAddNode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'stock': return <TrendingUp className="w-4 h-4" />;
      case 'question': return <Search className="w-4 h-4" />;
      case 'insight': return <Lightbulb className="w-4 h-4" />;
      case 'analysis': return <Brain className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'from-blue-500 to-blue-600';
      case 'question': return 'from-amber-500 to-amber-600';
      case 'insight': return 'from-green-500 to-green-600';
      case 'analysis': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        onDoubleClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          onAddNode(x, y);
        }}
      >
        {/* Connections */}
        {nodes.map(node => 
          node.connections.map(connId => {
            const connectedNode = nodes.find(n => n.id === connId);
            if (!connectedNode) return null;
            
            return (
              <line
                key={`${node.id}-${connId}`}
                x1={node.x}
                y1={node.y}
                x2={connectedNode.x}
                y2={connectedNode.y}
                stroke="#4B5563"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="opacity-60"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })
        )}
        
        {/* Nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="30"
              className="fill-gray-800 stroke-gray-600"
              strokeWidth="2"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              className={`fill-gradient-to-br ${getNodeColor(node.type)} opacity-80`}
            />
            <foreignObject
              x={node.x - 12}
              y={node.y - 12}
              width="24"
              height="24"
              className="pointer-events-none"
            >
              <div className="flex items-center justify-center text-white">
                {getNodeIcon(node.type)}
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
      
      {/* Node Labels */}
      {nodes.map(node => (
        <div
          key={`label-${node.id}`}
          className="absolute pointer-events-none"
          style={{
            left: node.x - 40,
            top: node.y + 40,
            width: '80px'
          }}
        >
          <div className="bg-gray-800 rounded-md px-2 py-1 text-xs text-white text-center border border-gray-600">
            {node.title}
          </div>
        </div>
      ))}
      
      {/* Floating Nodes */}
      {nodes.map(node => (
        <div
          key={`floating-${node.id}`}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: node.x,
            top: node.y,
            width: '60px',
            height: '60px'
          }}
          onClick={() => onNodeClick(node)}
        >
          <div className="w-full h-full rounded-full bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors duration-200" />
        </div>
      ))}
    </div>
  );
};