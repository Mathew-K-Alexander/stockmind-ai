import React, { useState } from 'react';
import { ConceptMap } from './components/ConceptMap';
import { ResearchPanel } from './components/ResearchPanel';
import { StockSearch } from './components/StockSearch';
import { AIInsights } from './components/AIInsights';
import { Brain, BarChart3, Search, Target } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

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

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [researchNodes, setResearchNodes] = useState<ResearchNode[]>([]);
  const [pendingQuestions, setPendingQuestions] = useState<string[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState('');

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setCurrentAnalysis(`Initiating comprehensive analysis for ${stock.name} (${stock.symbol}). Current price: $${stock.price.toFixed(2)} with ${stock.change >= 0 ? 'positive' : 'negative'} momentum of ${stock.changePercent.toFixed(2)}%.`);
    
    // Add initial stock node to concept map
    const stockNode: ResearchNode = {
      id: `stock-${stock.symbol}`,
      title: stock.symbol,
      type: 'stock',
      content: `${stock.name} - $${stock.price.toFixed(2)}`,
      x: 400,
      y: 200,
      connections: [],
      confidence: 85
    };
    
    setResearchNodes([stockNode]);
    
    // Generate initial questions
    const initialQuestions = [
      `What drives ${stock.symbol}'s recent price movement?`,
      `How does ${stock.symbol} compare to industry peers?`,
      `What are the key financial metrics to analyze for ${stock.symbol}?`
    ];
    
    setPendingQuestions(initialQuestions);
  };

  const handleNewQuestion = (question: string) => {
    if (!pendingQuestions.includes(question)) {
      setPendingQuestions(prev => [...prev, question]);
    }
  };

  const handleAnswerQuestion = (question: string, answer: string) => {
    // Remove question from pending
    setPendingQuestions(prev => prev.filter(q => q !== question));
    
    if (answer === 'positive') {
      // Add as research node
      const questionNode: ResearchNode = {
        id: `question-${Date.now()}`,
        title: 'Research Q',
        type: 'question',
        content: question,
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        connections: selectedStock ? [`stock-${selectedStock.symbol}`] : [],
        confidence: 75
      };
      
      setResearchNodes(prev => [...prev, questionNode]);
      
      // Generate insight
      const insight = `Investigation into "${question}" reveals important market dynamics that warrant deeper analysis.`;
      setInsights(prev => [...prev, insight]);
      
      // Generate follow-up questions
      const followUp = `Based on the investigation of "${question}", what specific metrics should we prioritize?`;
      setTimeout(() => {
        handleNewQuestion(followUp);
      }, 1000);
    }
  };

  const handleNodeClick = (node: ResearchNode) => {
    setCurrentAnalysis(`Examining ${node.type}: ${node.content}`);
  };

  const handleAddNode = (x: number, y: number) => {
    const newNode: ResearchNode = {
      id: `node-${Date.now()}`,
      title: 'New Insight',
      type: 'insight',
      content: 'Double-click to add research nodes',
      x,
      y,
      connections: [],
      confidence: 60
    };
    
    setResearchNodes(prev => [...prev, newNode]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">StockMind AI</h1>
              <p className="text-gray-400 text-sm">Intelligent Stock Research Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Research Active</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span>Nodes: {researchNodes.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Search className="w-4 h-4" />
                <span>Questions: {pendingQuestions.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Insights: {insights.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto">
          <div className="p-4 space-y-6">
            <StockSearch onStockSelect={handleStockSelect} />
          </div>
        </div>

        {/* Center - Concept Map */}
        <div className="flex-1 bg-gray-900 relative">
          <div className="absolute inset-4">
            <ConceptMap
              nodes={researchNodes}
              onNodeClick={handleNodeClick}
              onAddNode={handleAddNode}
            />
          </div>
          
          {/* Floating Instructions */}
          {researchNodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 max-w-md text-center">
                <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Start Your Research</h3>
                <p className="text-gray-400 mb-4">
                  Select a stock from the sidebar to begin building your research concept map. 
                  The AI will suggest questions and insights to guide your analysis.
                </p>
                <div className="text-sm text-gray-500">
                  • Select stocks to analyze<br/>
                  • Answer AI-generated questions<br/>
                  • Build visual research connections<br/>
                  • Double-click to add custom nodes
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-gray-900 border-l border-gray-700 overflow-y-auto">
          <div className="p-4 space-y-6">
            <ResearchPanel
              selectedStock={selectedStock?.symbol || ''}
              currentAnalysis={currentAnalysis}
              questions={pendingQuestions}
              insights={insights}
              onAnswerQuestion={handleAnswerQuestion}
            />
            
            {selectedStock && (
              <AIInsights
                stockSymbol={selectedStock.symbol}
                onNewQuestion={handleNewQuestion}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;