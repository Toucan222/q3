import React, { useState, useMemo } from 'react'

// Hardcoded monthly price data (last 5 years)
const stockData = {
  'AAPL': {
    name: 'Apple Inc.',
    prices: [
      { date: '2019-01', price: 157.92 },
      { date: '2019-06', price: 197.92 },
      { date: '2019-12', price: 293.65 },
      { date: '2020-03', price: 254.29 },
      { date: '2020-09', price: 115.81 },
      { date: '2020-12', price: 132.69 },
      { date: '2021-06', price: 139.96 },
      { date: '2021-12', price: 177.57 },
      { date: '2022-03', price: 174.61 },
      { date: '2022-06', price: 136.72 },
      { date: '2022-12', price: 129.93 },
      { date: '2023-06', price: 193.97 },
      { date: '2023-12', price: 197.57 }
    ]
  },
  'MSFT': {
    name: 'Microsoft',
    prices: [
      { date: '2019-01', price: 104.43 },
      { date: '2019-06', price: 133.96 },
      { date: '2019-12', price: 157.70 },
      { date: '2020-03', price: 149.70 },
      { date: '2020-09', price: 210.33 },
      { date: '2020-12', price: 222.42 },
      { date: '2021-06', price: 270.90 },
      { date: '2021-12', price: 336.32 },
      { date: '2022-03', price: 308.31 },
      { date: '2022-06', price: 259.58 },
      { date: '2022-12', price: 239.82 },
      { date: '2023-06', price: 337.34 },
      { date: '2023-12', price: 374.58 }
    ]
  },
  'GOOGL': {
    name: 'Google',
    prices: [
      { date: '2019-01', price: 1116.37 },
      { date: '2019-06', price: 1082.80 },
      { date: '2019-12', price: 1337.02 },
      { date: '2020-03', price: 1146.82 },
      { date: '2020-09', price: 1464.52 },
      { date: '2020-12', price: 1751.88 },
      { date: '2021-06', price: 2441.79 },
      { date: '2021-12', price: 2897.04 },
      { date: '2022-03', price: 2781.35 },
      { date: '2022-06', price: 2174.75 },
      { date: '2022-12', price: 88.73 }, // Post-split price
      { date: '2023-06', price: 122.34 },
      { date: '2023-12', price: 139.69 }
    ]
  }
}

export default function DrawdownViewer() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL')

  const calculations = useMemo(() => {
    const prices = stockData[selectedTicker].prices
    let maxDrawdown = 0
    let maxDrawdownStart = null
    let maxDrawdownEnd = null
    let peak = prices[0].price

    prices.forEach((current, i) => {
      if (current.price > peak) {
        peak = current.price
      }
      
      const drawdown = (peak - current.price) / peak * 100
      
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown
        maxDrawdownEnd = current.date
        // Find the peak that led to this drawdown
        for (let j = i; j >= 0; j--) {
          if (prices[j].price === peak) {
            maxDrawdownStart = prices[j].date
            break
          }
        }
      }
    })

    return {
      maxDrawdown,
      maxDrawdownStart,
      maxDrawdownEnd,
      currentPrice: prices[prices.length - 1].price,
      prices
    }
  }, [selectedTicker])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          Historical Drawdown Viewer
        </h1>
        <p className="text-gray-600">
          See the largest historical price drops
        </p>
      </header>

      <div className="card p-6 mb-8">
        <div className="mb-6">
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

        {/* Max Drawdown Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-red-600 mb-2">
            -{calculations.maxDrawdown.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">
            Maximum Drawdown
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {calculations.maxDrawdownStart} to {calculations.maxDrawdownEnd}
          </div>
        </div>

        {/* Visual Representation */}
        <div className="relative h-64 mb-8">
          {calculations.prices.map((point, index) => {
            const x = (index / (calculations.prices.length - 1)) * 100
            const y = 100 - ((point.price / Math.max(...calculations.prices.map(p => p.price))) * 100)
            
            return (
              <React.Fragment key={point.date}>
                {index > 0 && (
                  <line
                    x1={`${(index - 1) / (calculations.prices.length - 1) * 100}%`}
                    y1={`${100 - ((calculations.prices[index - 1].price / Math.max(...calculations.prices.map(p => p.price))) * 100)}%`}
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={point.date >= calculations.maxDrawdownStart && point.date <= calculations.maxDrawdownEnd ? 'red' : '#4F46E5'}
                    strokeWidth="2"
                    className="absolute"
                    style={{ vectorEffect: 'non-scaling-stroke' }}
                  />
                )}
                <div
                  className="absolute w-2 h-2 bg-white border-2 border-blue-600 rounded-full transform -translate-x-1 -translate-y-1"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    borderColor: point.date >= calculations.maxDrawdownStart && point.date <= calculations.maxDrawdownEnd ? 'red' : '#4F46E5'
                  }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1">
                    <div className="text-xs whitespace-nowrap opacity-0 group-hover:opacity-100">
                      ${point.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {/* Risk Context */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Risk Context</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Recovery Time</div>
              <div className="font-medium">
                {calculations.maxDrawdown > 20 ? 'Extended' : 'Moderate'} Period
              </div>
            </div>
            <div>
              <div className="text-gray-500">Volatility Level</div>
              <div className="font-medium">
                {calculations.maxDrawdown > 30 ? 'High' : calculations.maxDrawdown > 15 ? 'Medium' : 'Low'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            alert(`${selectedTicker} experienced a maximum drawdown of ${calculations.maxDrawdown.toFixed(1)}% from ${calculations.maxDrawdownStart} to ${calculations.maxDrawdownEnd}`)
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Share Analysis 📊
        </button>
      </div>
    </div>
  )
}
