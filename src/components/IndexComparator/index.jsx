import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Hardcoded performance data
const stockData = {
  'AAPL': {
    name: 'Apple Inc.',
    fiveYearReturn: 270.5,
    dividendYield: 0.5
  },
  'MSFT': {
    name: 'Microsoft',
    fiveYearReturn: 310.2,
    dividendYield: 0.8
  },
  'GOOGL': {
    name: 'Google',
    fiveYearReturn: 180.3,
    dividendYield: 0
  }
}

const spyReturn = 95.2 // S&P 500 5-year return
const initialInvestment = 1000

export default function IndexComparator() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')
  const [reinvestDividends, setReinvestDividends] = useState(true)

  const calculateFinalValue = (baseReturn, dividendYield) => {
    let totalReturn = baseReturn
    if (reinvestDividends && dividendYield) {
      totalReturn += (dividendYield * 5) // Simple dividend reinvestment calculation
    }
    return Math.round(initialInvestment * (1 + totalReturn / 100))
  }

  const stockFinalValue = calculateFinalValue(
    stockData[selectedTicker].fiveYearReturn,
    stockData[selectedTicker].dividendYield
  )
  const spyFinalValue = calculateFinalValue(spyReturn, 1.5) // SPY dividend yield ~1.5%
  const difference = stockFinalValue - spyFinalValue

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          Slow-and-Steady Index Comparator
        </h1>
        <p className="text-gray-600">
          Compare 5-year returns: Your stock vs. S&P 500
        </p>
      </header>

      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Stock
            </label>
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.entries(stockData).map(([ticker, data]) => (
                <option key={ticker} value={ticker}>
                  {ticker} - {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={reinvestDividends}
                onChange={(e) => setReinvestDividends(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Reinvest Dividends</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-center">
          $1,000 invested 5 years ago would be worth:
        </h2>
        <div className="space-y-6">
          {/* Stock Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{selectedTicker}</span>
              <span className="font-bold">${stockFinalValue.toLocaleString()}</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stockFinalValue / Math.max(stockFinalValue, spyFinalValue)) * 100}%` }}
                className="absolute h-full bg-blue-500 rounded-full"
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* S&P 500 Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">S&P 500</span>
              <span className="font-bold">${spyFinalValue.toLocaleString()}</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(spyFinalValue / Math.max(stockFinalValue, spyFinalValue)) * 100}%` }}
                className="absolute h-full bg-gray-500 rounded-full"
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Difference Highlight */}
      <div className="card p-6 bg-blue-50 border border-blue-100">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            {difference > 0 ? (
              `You'd have $${difference.toLocaleString()} more with ${selectedTicker}!`
            ) : (
              `The S&P 500 outperformed by $${Math.abs(difference).toLocaleString()}`
            )}
          </h3>
          <button
            onClick={() => {
              // In a real app, this would integrate with social media sharing
              alert(`With ${selectedTicker}, I'd have $${stockFinalValue.toLocaleString()} instead of $${spyFinalValue.toLocaleString()} with the S&P 500!`)
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Results 📈
          </button>
        </div>
      </div>
    </div>
  )
}
