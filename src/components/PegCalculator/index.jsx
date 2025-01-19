import React, { useState } from 'react'

// Sample stock presets for quick selection
const stockPresets = {
  'AAPL': { name: 'Apple Inc.', pe: 28.5, growth: 15.3 },
  'MSFT': { name: 'Microsoft', pe: 35.2, growth: 18.5 },
  'GOOGL': { name: 'Google', pe: 25.8, growth: 14.2 },
  'AMZN': { name: 'Amazon', pe: 42.3, growth: 22.1 },
  'NVDA': { name: 'NVIDIA', pe: 75.4, growth: 35.8 }
}

export default function PegCalculator() {
  const [pe, setPe] = useState(20)
  const [growth, setGrowth] = useState(10)
  const [selectedPreset, setSelectedPreset] = useState('')

  const handlePresetChange = (ticker) => {
    if (ticker) {
      const preset = stockPresets[ticker]
      setPe(preset.pe)
      setGrowth(preset.growth)
    }
    setSelectedPreset(ticker)
  }

  const pegRatio = growth > 0 ? (pe / growth) : 0

  const getPegRatingColor = () => {
    if (pegRatio <= 1) return 'text-green-600'
    if (pegRatio <= 1.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPegRating = () => {
    if (pegRatio <= 1) return 'Potentially Undervalued'
    if (pegRatio <= 1.5) return 'Fairly Valued'
    return 'Potentially Overvalued'
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          PEG Ratio Calculator
        </h1>
        <p className="text-gray-600">
          Check if a stock might be overvalued or undervalued
        </p>
      </header>

      <div className="card p-6 mb-8">
        {/* Preset Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Select Stock (Optional)
          </label>
          <select
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Custom Values</option>
            {Object.entries(stockPresets).map(([ticker, data]) => (
              <option key={ticker} value={ticker}>
                {ticker} - {data.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              P/E Ratio: {pe}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={pe}
              onChange={(e) => setPe(Number(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              value={pe}
              onChange={(e) => setPe(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Growth Rate (%): {growth}
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="0.1"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card p-6 text-center">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">PEG Ratio</h2>
          <div className="text-5xl font-bold mb-2">
            {pegRatio.toFixed(2)}
          </div>
          <div className={`text-lg font-medium ${getPegRatingColor()}`}>
            {getPegRating()}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">P/E Ratio</div>
            <div className="font-bold">{pe.toFixed(1)}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Growth Rate</div>
            <div className="font-bold">{growth}%</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Rating</div>
            <div className={`font-bold ${getPegRatingColor()}`}>
              {pegRatio <= 1 ? '👍' : pegRatio <= 1.5 ? '👌' : '👎'}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-6">
          <p>PEG Ratio = P/E Ratio ÷ Growth Rate</p>
          <p>Generally: &lt;1 Undervalued, 1-1.5 Fair Value, &gt;1.5 Overvalued</p>
        </div>

        <button
          onClick={() => {
            alert(`PEG Ratio: ${pegRatio.toFixed(2)} (${getPegRating()})`)
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Share Result 📊
        </button>
      </div>
    </div>
  )
}
