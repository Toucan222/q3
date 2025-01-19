import React, { useState, useMemo } from 'react'

// Hardcoded dividend stock data
const dividendStocks = {
  'VYM': {
    name: 'Vanguard High Dividend ETF',
    currentYield: 3.2,
    growthRate: 6,
    price: 110
  },
  'SCHD': {
    name: 'Schwab US Dividend ETF',
    currentYield: 3.5,
    growthRate: 7,
    price: 75
  },
  'JNJ': {
    name: 'Johnson & Johnson',
    currentYield: 3.0,
    growthRate: 5,
    price: 155
  },
  'PG': {
    name: 'Procter & Gamble',
    currentYield: 2.8,
    growthRate: 5.5,
    price: 145
  },
  'KO': {
    name: 'Coca-Cola',
    currentYield: 3.1,
    growthRate: 4.5,
    price: 60
  }
}

export default function DividendVisualizer() {
  const [selectedTicker, setSelectedTicker] = useState('VYM')
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [years, setYears] = useState(10)

  const calculations = useMemo(() => {
    const stock = dividendStocks[selectedTicker]
    const results = []
    let currentValue = initialInvestment
    let totalInvested = initialInvestment
    let yearlyDividend = (currentValue * stock.currentYield) / 100

    for (let year = 0; year <= years; year++) {
      results.push({
        year,
        value: currentValue,
        dividend: yearlyDividend,
        totalInvested,
        yield: (yearlyDividend / totalInvested) * 100
      })

      // Compound for next year
      currentValue += yearlyDividend
      yearlyDividend = (currentValue * stock.currentYield * (1 + stock.growthRate / 100) ** year) / 100
    }

    return results
  }, [selectedTicker, initialInvestment, years])

  const finalValues = calculations[calculations.length - 1]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          Dividend Reinvestment Calculator
        </h1>
        <p className="text-gray-600">
          See how your dividend income could grow over time
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="card p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Stock
              </label>
              <select
                value={selectedTicker}
                onChange={(e) => setSelectedTicker(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.entries(dividendStocks).map(([ticker, data]) => (
                  <option key={ticker} value={ticker}>
                    {ticker} - {data.name} ({data.currentYield}% yield)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment: ${initialInvestment.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Horizon: {years} years
              </label>
              <input
                type="range"
                min="5"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Stock Details</h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p>Current Yield: {dividendStocks[selectedTicker].currentYield}%</p>
                <p>Growth Rate: {dividendStocks[selectedTicker].growthRate}% per year</p>
                <p>Current Price: ${dividendStocks[selectedTicker].price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Visualization */}
        <div className="card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Dividend Growth Over Time
            </h2>
            <div className="h-64 relative">
              {calculations.map((data, index) => {
                const maxDividend = calculations[calculations.length - 1].dividend
                const height = (data.dividend / maxDividend) * 100
                const width = 100 / calculations.length

                return (
                  <div
                    key={index}
                    className="absolute bottom-0 bg-green-500 opacity-80 hover:opacity-100 transition-opacity"
                    style={{
                      height: `${height}%`,
                      width: `${width}%`,
                      left: `${index * width}%`
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                      ${Math.round(data.dividend).toLocaleString()}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              Years
            </div>
          </div>

          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">After {years} Years:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Total Value</div>
                <div className="text-lg font-bold text-gray-900">
                  ${Math.round(finalValues.value).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Annual Dividend</div>
                <div className="text-lg font-bold text-green-600">
                  ${Math.round(finalValues.dividend).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Yield on Cost</div>
                <div className="text-lg font-bold text-blue-600">
                  {finalValues.yield.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Return</div>
                <div className="text-lg font-bold text-purple-600">
                  {(((finalValues.value - initialInvestment) / initialInvestment) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            alert(`After ${years} years, $${initialInvestment.toLocaleString()} in ${selectedTicker} could generate $${Math.round(finalValues.dividend).toLocaleString()} in annual dividends!`)
          }}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Share Results 📈
        </button>
      </div>
    </div>
  )
}
