import React, { useState } from 'react'

// Hardcoded earnings data
const earningsData = {
  'AAPL': {
    name: 'Apple Inc.',
    quarters: [
      { quarter: 'Q4 2023', expected: 2.10, actual: 2.18, beat: true },
      { quarter: 'Q3 2023', expected: 1.95, actual: 2.05, beat: true },
      { quarter: 'Q2 2023', expected: 1.75, actual: 1.65, beat: false },
      { quarter: 'Q1 2023', expected: 1.80, actual: 1.95, beat: true },
      { quarter: 'Q4 2022', expected: 1.70, actual: 1.88, beat: true },
      { quarter: 'Q3 2022', expected: 1.65, actual: 1.55, beat: false },
      { quarter: 'Q2 2022', expected: 1.50, actual: 1.65, beat: true },
      { quarter: 'Q1 2022', expected: 1.45, actual: 1.52, beat: true }
    ]
  },
  'MSFT': {
    name: 'Microsoft',
    quarters: [
      { quarter: 'Q4 2023', expected: 2.65, actual: 2.85, beat: true },
      { quarter: 'Q3 2023', expected: 2.50, actual: 2.72, beat: true },
      { quarter: 'Q2 2023', expected: 2.35, actual: 2.45, beat: true },
      { quarter: 'Q1 2023', expected: 2.30, actual: 2.20, beat: false },
      { quarter: 'Q4 2022', expected: 2.15, actual: 2.35, beat: true },
      { quarter: 'Q3 2022', expected: 2.10, actual: 2.25, beat: true },
      { quarter: 'Q2 2022', expected: 1.95, actual: 1.85, beat: false },
      { quarter: 'Q1 2022', expected: 1.90, actual: 2.05, beat: true }
    ]
  },
  'GOOGL': {
    name: 'Google',
    quarters: [
      { quarter: 'Q4 2023', expected: 1.85, actual: 1.95, beat: true },
      { quarter: 'Q3 2023', expected: 1.75, actual: 1.65, beat: false },
      { quarter: 'Q2 2023', expected: 1.60, actual: 1.75, beat: true },
      { quarter: 'Q1 2023', expected: 1.55, actual: 1.68, beat: true },
      { quarter: 'Q4 2022', expected: 1.45, actual: 1.55, beat: true },
      { quarter: 'Q3 2022', expected: 1.40, actual: 1.35, beat: false },
      { quarter: 'Q2 2022', expected: 1.35, actual: 1.45, beat: true },
      { quarter: 'Q1 2022', expected: 1.30, actual: 1.42, beat: true }
    ]
  }
}

export default function EarningsChecker() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')
  
  const stockData = earningsData[selectedTicker]
  const beatCount = stockData.quarters.filter(q => q.beat).length
  const beatRate = (beatCount / stockData.quarters.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          Earnings Beat Checker
        </h1>
        <p className="text-gray-600">
          Track earnings performance over the last 8 quarters
        </p>
      </header>

      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-8">
          <select
            value={selectedTicker}
            onChange={(e) => setSelectedTicker(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.keys(earningsData).map(ticker => (
              <option key={ticker} value={ticker}>
                {ticker} - {earningsData[ticker].name}
              </option>
            ))}
          </select>

          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {beatRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">
              Beat Rate ({beatCount}/{stockData.quarters.length} quarters)
            </div>
          </div>
        </div>

        {/* Earnings Bar Chart */}
        <div className="space-y-4">
          {stockData.quarters.map((quarter, index) => {
            const surprisePercent = ((quarter.actual - quarter.expected) / quarter.expected) * 100
            const barWidth = Math.abs(surprisePercent) * 2 // Scale for better visibility
            const isPositive = quarter.actual > quarter.expected

            return (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    {quarter.quarter}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${quarter.actual.toFixed(2)} vs ${quarter.expected.toFixed(2)}
                  </span>
                </div>
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className={`absolute h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} 
                      ${isPositive ? 'left-1/2' : 'right-1/2'} transition-all duration-500`}
                    style={{ width: `${barWidth}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                    <span className={isPositive ? 'text-green-900' : 'text-red-900'}>
                      {isPositive ? '+' : ''}{surprisePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Card */}
      <div className="card p-6 bg-blue-50 border border-blue-100">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            {stockData.name} has beaten earnings expectations in {beatCount} of the last {stockData.quarters.length} quarters
          </h3>
          <button
            onClick={() => {
              alert(`${stockData.name} Beat Rate: ${beatRate.toFixed(1)}% (${beatCount}/${stockData.quarters.length} quarters)`)
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Results 📊
          </button>
        </div>
      </div>
    </div>
  )
}
