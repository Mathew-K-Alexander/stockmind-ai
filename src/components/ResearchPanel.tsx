import React from 'react';
import { MessageSquare, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface ResearchPanelProps {
  selectedStock: string;
  currentAnalysis: string;
  questions: string[];
  insights: string[];
  onAnswerQuestion: (question: string, answer: string) => void;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({
  selectedStock,
  currentAnalysis,
  questions,
  insights,
  onAnswerQuestion
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{selectedStock || 'Select a Stock'}</h2>
            <p className="text-gray-400 text-sm">Research Analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Active Research</span>
        </div>
      </div>

      {/* Current Analysis */}
      {currentAnalysis && (
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <h3 className="text-white font-medium">Current Analysis</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{currentAnalysis}</p>
        </div>
      )}

      {/* Pending Questions */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <h3 className="text-white font-medium">Research Questions</h3>
          <span className="bg-amber-600 text-amber-100 text-xs px-2 py-1 rounded-full">
            {questions.length}
          </span>
        </div>
        
        {questions.length === 0 ? (
          <div className="text-gray-400 text-sm italic">No pending questions. Add a stock to begin research.</div>
        ) : (
          <div className="space-y-2">
            {questions.map((question, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-3 border-l-4 border-amber-500">
                <p className="text-gray-300 text-sm mb-2">{question}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onAnswerQuestion(question, 'positive')}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                  >
                    Investigate
                  </button>
                  <button
                    onClick={() => onAnswerQuestion(question, 'negative')}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <h3 className="text-white font-medium">Key Insights</h3>
        </div>
        
        {insights.length === 0 ? (
          <div className="text-gray-400 text-sm italic">Insights will appear as research progresses.</div>
        ) : (
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="bg-green-900 bg-opacity-30 rounded-lg p-3 border-l-4 border-green-500">
                <p className="text-green-100 text-sm">{insight}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Research Progress */}
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">Research Depth</span>
          <span className="text-gray-400 text-sm">{Math.min(insights.length * 20, 100)}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(insights.length * 20, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};