import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { BiSort, BiFilter } from 'react-icons/bi'
import { stocks, metricLabels } from '../../data/stocks'

export default function StockTable() {
  const navigate = useNavigate()
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filters, setFilters] = useState({})

  const sortedAndFilteredStocks = useMemo(() => {
    let result = [...stocks]

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(stock => {
          if (key.startsWith('prediction')) {
            const predictionType = key.split('.')[1]
            return stock.predictions[predictionType] >= value
          }
          return stock.metrics[key] >= value
        })
      }
    })

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = sortConfig.key.startsWith('prediction') 
          ? a.predictions[sortConfig.key.split('.')[1]]
          : a.metrics[sortConfig.key]
        let bValue = sortConfig.key.startsWith('prediction')
          ? b.predictions[sortConfig.key.split('.')[1]]
          : b.metrics[sortConfig.key]
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [stocks, sortConfig, filters])

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (key, value) => {
    setFilters(current => ({
      ...current,
      [key]: value
    }))
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticker
            </th>
            {Object.entries(metricLabels).map(([key, label]) => (
              <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>{label}</span>
                  <div className="flex space-x-1">
                    <button onClick={() => handleSort(key)}>
                      <BiSort className="w-4 h-4" />
                    </button>
                    <Menu as="div" className="relative">
                      <Menu.Button>
                        <BiFilter className="w-4 h-4" />
                      </Menu.Button>
                      <Menu.Items className="absolute z-10 mt-1 bg-white shadow-lg rounded-md py-1">
                        {[7, 8, 9, 10].map(value => (
                          <Menu.Item key={value}>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } block px-4 py-2 text-sm w-full text-left`}
                                onClick={() => handleFilter(key, value)}
                              >
                                ≥ {value}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bear %
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Base %
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bull %
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedAndFilteredStocks.map((stock, idx) => (
            <tr
              key={stock.ticker}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate('/', { state: { stock } })}
            >
              <td className="px-6 py-4 whitespace-nowrap">{stock.name}</td>
              <td className="px-6 py-4 whitespace-nowrap font-mono">{stock.ticker}</td>
              {Object.keys(metricLabels).map(key => (
                <td key={key} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">{stock.metrics[key]}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-green-400 rounded-full h-1"
                        style={{ width: `${stock.metrics[key] * 10}%` }}
                      />
                    </div>
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-red-500">
                {stock.predictions.bear}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {stock.predictions.base}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-green-500">
                +{stock.predictions.bull}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
