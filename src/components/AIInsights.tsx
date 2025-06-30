import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, AlertTriangle, Target, Clock, Zap } from 'lucide-react';

interface AIInsightsProps {
  stockSymbol: string;
  onNewQuestion: (question: string) => void;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ stockSymbol, onNewQuestion }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [currentInsight, setCurrentInsight] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (stockSymbol) {
      generateInsights();
    }
  }, [stockSymbol]);

  const generateInsights = () => {
    setIsThinking(true);
    
    // Simulate AI thinking process
    setTimeout(() => {
      const insights = getInsightsForStock(stockSymbol);
      const questions = getQuestionsForStock(stockSymbol);
      
      setCurrentInsight(insights);
      setSuggestedQuestions(questions);
      setIsThinking(false);
    }, 2000);
  };

  const getInsightsForStock = (symbol: string): string => {
    const insights = {
      'AAPL': 'Apple shows strong fundamentals with consistent revenue growth. Recent iPhone sales data suggests market saturation concerns, but services revenue continues expanding. Consider investigating supply chain dependencies and competitive positioning in emerging markets.',
      'MSFT': 'Microsoft demonstrates robust cloud growth through Azure platform. Enterprise adoption rates are accelerating, but pricing pressure from competitors like AWS needs analysis. Explore AI integration impact on productivity software suite.',
      'GOOGL': 'Alphabet faces regulatory scrutiny but maintains search dominance. AI investments in Bard and cloud services show promise. Ad revenue sensitivity to economic cycles requires deeper investigation.',
      'TSLA': 'Tesla shows volatility with production scaling challenges. Energy storage business potential undervalued by market. Investigate autonomous driving timeline and competitive moat sustainability.',
      'NVDA': 'NVIDIA benefits from AI boom but faces cyclical semiconductor risks. Data center revenue growth impressive, but gaming segment volatility concerning. Analyze China export restrictions impact.'
    };
    
    return insights[symbol as keyof typeof insights] || 'Analyzing market position and competitive dynamics for detailed insights...';
  };

  const getQuestionsForStock = (symbol: string): string[] => {
    const questionSets = {
      'AAPL': [
        'How sustainable is Apple\'s services revenue growth trajectory?',
        'What impact will emerging market smartphone competition have on iPhone sales?',
        'How well positioned is Apple for the next major technology shift?'
      ],
      'MSFT': [
        'Can Microsoft maintain Azure\'s growth rate against AWS competition?',
        'How will AI integration affect Office 365 pricing power?',
        'What are the regulatory risks for Microsoft\'s market position?'
      ],
      'GOOGL': [
        'How will AI chatbots impact Google\'s search advertising business?',
        'What are the potential financial impacts of ongoing antitrust cases?',
        'Can Google Cloud catch up to AWS and Azure in market share?'
      ],
      'TSLA': [
        'When will Tesla achieve full autonomous driving capability?',
        'How scalable is Tesla\'s energy storage business model?',
        'What are Tesla\'s competitive advantages in the EV market long-term?'
      ],
      'NVDA': [
        'How sustainable is the current AI-driven demand for NVIDIA chips?',
        'What happens to NVIDIA if the crypto market crashes again?',
        'How will geopolitical tensions affect NVIDIA\'s China business?'
      ]
    };
    
    return questionSets[symbol as keyof typeof questionSets] || [
      'What are the key competitive advantages of this company?',
      'How does this stock perform during economic downturns?',
      'What are the main risks facing this company\'s business model?'
    ];
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">AI Research Assistant</h2>
          <p className="text-gray-400 text-sm">Intelligent analysis and question generation</p>
        </div>
      </div>

      {/* Thinking State */}
      {isThinking && (
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            <span className="text-purple-400 font-medium">AI is analyzing {stockSymbol}...</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-2 bg-gray-600 rounded animate-pulse w-3/4"></div>
            <div className="h-2 bg-gray-600 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      )}

      {/* Current Insight */}
      {currentInsight && !isThinking && (
        <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 mb-6 border border-purple-500">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-purple-400" />
            <h3 className="text-purple-300 font-medium">Current Analysis</h3>
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">{currentInsight}</p>
        </div>
      )}

      {/* Suggested Questions */}
      {suggestedQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-medium">Suggested Research Questions</h3>
          </div>
          
          <div className="space-y-3">
            {suggestedQuestions.map((question, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-amber-500 transition-colors cursor-pointer group"
                onClick={() => onNewQuestion(question)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                      {question}
                    </p>
                  </div>
                  <Zap className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research Actions */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex space-x-3">
          <button
            onClick={generateInsights}
            disabled={isThinking}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>Deep Analysis</span>
          </button>
          <button
            onClick={() => onNewQuestion('What are the key risks I should investigate further?')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Risk Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
};