import React, { useState } from 'react'
import { metricLabels, advancedMetrics } from '../../data/stocks'
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '../shared/Tooltip'

export default function Scorecard({ metrics = {}, advancedData = {} }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-inter font-medium text-gray-900">
          Performance Metrics
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          <span>{showAdvanced ? 'Show Basic' : 'Show Advanced'}</span>
          <ChevronDownIcon className={`w-4 h-4 ml-1 transform transition-transform ${
            showAdvanced ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(metricLabels).map(([key, label]) => (
          <div key={key}>
            <div className="flex justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{label}</span>
                <Tooltip content={`How we calculate ${label}`}>
                  <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </div>
              <span className="font-medium text-gray-900">
                {metrics[key] || 0}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full transition-all duration-300"
                style={{ width: `${((metrics[key] || 0) / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {showAdvanced && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-500 mb-4">
            Advanced Metrics
          </h4>
          <div className="space-y-4">
            {Object.entries(advancedMetrics).map(([key, config]) => (
              <div key={key} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{config.label}</span>
                  <Tooltip content={config.description}>
                    <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400" />
                  </Tooltip>
                </div>
                <span className="font-mono text-sm text-gray-900">
                  {advancedData[key] || '0'}
                  <span className="text-gray-500 ml-1">{config.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
