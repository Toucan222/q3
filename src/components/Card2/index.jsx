import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BiSort, BiFilter } from 'react-icons/bi'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { stocks, metricLabels } from '../../data/stocks'
import { Tooltip } from '../shared/Tooltip'

export default function Card2() {
  const navigate = useNavigate()
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (key, value) => {
    setFilters(current => ({
      ...current,
      [key]: value === current[key] ? null : value
    }))
  }

  const filteredAndSortedStocks = useMemo(() => {
    let result = [...stocks]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply metric filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(stock => stock.metrics[key] >= value)
      }
    })

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a.metrics[sortConfig.key] || 0
        const bValue = b.metrics[sortConfig.key] || 0
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [stocks, sortConfig, filters, searchTerm])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-inter font-semibold text-gray-900">
            Stock Comparison
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Compare metrics across multiple stocks
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticker
                </th>
                {Object.entries(metricLabels).map(([key, label]) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{label}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleSort(key)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <BiSort size={16} />
                        </button>
                        <button
                          onClick={() => handleFilter(key, 9)}
                          className={`${filters[key] === 9 ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-600`}
                        >
                          <BiFilter size={16} />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedStocks.map((stock) => (
                <tr
                  key={stock.ticker}
                  onClick={() => navigate('/', { state: { stock } })}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stock.ticker}</div>
                  </td>
                  {Object.keys(metricLabels).map(key => (
                    <td key={key} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{stock.metrics[key]}</span>
                        <div className="flex-grow h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="h-1.5 bg-blue-500 rounded-full"
                            style={{ width: `${(stock.metrics[key] / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
