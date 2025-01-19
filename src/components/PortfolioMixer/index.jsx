import React, { useState, useEffect } from 'react'

// Hardcoded investment options
const investments = {
  'VOO': {
    name: 'Vanguard S&P 500 ETF',
    risk: 'Medium',
    return5yr: 85.2,
    type: 'ETF',
    color: '#4F46E5'
  },
  'QQQ': {
    name: 'Invesco QQQ Trust',
    risk: 'High',
    return5yr: 110.5,
    type: 'ETF',
    color: '#2563EB'
  },
  'AAPL': {
    name: 'Apple Inc.',
    risk: 'High',
    return5yr: 270.5,
    type: 'Stock',
    color: '#7C3AED'
  },
  'BND': {
    name: 'Vanguard Total Bond ETF',
    risk: 'Low',
    return5yr: 12.3,
    type: 'ETF',
    color: '#9333EA'
  },
  'VYM': {
    name: 'Vanguard High Dividend',
    risk: 'Medium',
    return5yr: 65.4,
    type: 'ETF',
    color: '#C026D3'
  }
}

export default function PortfolioMixer() {
  const [allocations, setAllocations] = useState({
    'VOO': 40,
    'QQQ': 30,
    'AAPL': 20,
    'BND': 10,
    'VYM': 0
  })

  const [totalReturn, setTotalReturn] = useState(0)

  useEffect(() => {
    // Calculate weighted return
    const weightedReturn = Object.entries(allocations).reduce((acc, [ticker, percentage]) => {
      return acc + (investments[ticker].return5yr * (percentage / 100))
    }, 0)
    setTotalReturn(weightedReturn)
  }, [allocations])

  const handleAllocationChange = (ticker, value) => {
    const newValue = parseInt(value)
    const oldValue = allocations[ticker]
    const difference = newValue - oldValue

    // Adjust other allocations proportionally
    const otherTickers = Object.keys(allocations).filter(t => t !== ticker)
    const totalOtherAllocation = otherTickers.reduce((sum, t) => sum + allocations[t], 0)

    const newAllocations = { ...allocations }
    newAllocations[ticker] = newValue

    if (totalOtherAllocation > 0) {
      otherTickers.forEach(t => {
        const proportion = allocations[t] / totalOtherAllocation
        newAllocations[t] = Math.max(0, allocations[t] - (difference * proportion))
      })
    }

    setAllocations(newAllocations)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          Portfolio Pie Mixer
        </h1>
        <p className="text-gray-600">
          Mix your perfect portfolio blend
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="card p-6">
          <div className="aspect-square relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {totalReturn.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">
                  5-Year Return
                </div>
              </div>
            </div>
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {Object.entries(allocations).reduce((acc, [ticker, percentage], index) => {
                const previousTotal = acc.total
                const strokeDasharray = percentage * 3.14159
                const strokeDashoffset = -previousTotal * 3.14159

                if (percentage > 0) {
                  acc.elements.push(
                    <circle
                      key={ticker}
                      cx="50"
                      cy="50"
                      r="50"
                      fill="none"
                      stroke={investments[ticker].color}
                      strokeWidth="100"
                      strokeDasharray={`${strokeDasharray} 314.159`}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500"
                    />
                  )
                }

                acc.total += percentage
                return acc
              }, { elements: [], total: 0 }).elements}
            </svg>
          </div>
        </div>

        {/* Allocation Controls */}
        <div className="card p-6">
          <div className="space-y-6">
            {Object.entries(investments).map(([ticker, details]) => (
              <div key={ticker}>
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="font-medium">{ticker}</div>
                    <div className="text-sm text-gray-500">{details.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{allocations[ticker]}%</div>
                    <div className="text-sm text-gray-500">{details.risk} Risk</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allocations[ticker]}
                  onChange={(e) => handleAllocationChange(ticker, e.target.value)}
                  className="w-full"
                  style={{
                    '--range-color': details.color
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              Portfolio Stats:
              <ul className="mt-2 space-y-1">
                <li>Expected Return (5yr): {totalReturn.toFixed(1)}%</li>
                <li>Number of Holdings: {Object.values(allocations).filter(v => v > 0).length}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            alert('Portfolio mix saved! (Demo only)')
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Mix 📊
        </button>
      </div>
    </div>
  )
}
