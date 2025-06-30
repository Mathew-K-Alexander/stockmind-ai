import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

interface StockSearchProps {
  onStockSelect: (stock: Stock) => void;
}

export const StockSearch: React.FC<StockSearchProps> = ({ onStockSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockStocks: Stock[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.34,
      changePercent: 1.35,
      volume: '45.2M',
      marketCap: '2.78T'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 338.11,
      change: -1.24,
      changePercent: -0.37,
      volume: '23.8M',
      marketCap: '2.51T'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 127.83,
      change: 0.89,
      changePercent: 0.70,
      volume: '28.4M',
      marketCap: '1.63T'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 248.50,
      change: -5.67,
      changePercent: -2.23,
      volume: '67.9M',
      marketCap: '791.2B'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 445.87,
      change: 12.45,
      changePercent: 2.87,
      volume: '41.2M',
      marketCap: '1.09T'
    }
  ];

  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Stock Research</h2>
          <p className="text-gray-400 text-sm">Search and analyze stocks</p>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stocks by symbol or name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </form>

      {/* Stock List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredStocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock)}
            className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors duration-200 border border-gray-600 hover:border-gray-500"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{stock.symbol}</h3>
                  <p className="text-gray-400 text-sm">{stock.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${stock.price.toFixed(2)}</p>
                <div className={`flex items-center space-x-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-sm">
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="w-3 h-3" />
                  <span>Vol: {stock.volume}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3 h-3" />
                  <span>Cap: {stock.marketCap}</span>
                </div>
              </div>
              <span className="text-blue-400 hover:text-blue-300">Analyze →</span>
            </div>
          </div>
        ))}
      </div>

      {isSearching && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};