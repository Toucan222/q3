import React, { useState } from 'react'
import { QuestionMarkCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '../shared/Tooltip'

export default function Predictions({ predictions }) {
  const [showAssumptions, setShowAssumptions] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-inter font-medium text-gray-900">
          Scenario Analysis
        </h3>
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          <InformationCircleIcon className="w-4 h-4 mr-1" />
          <span>View Assumptions</span>
        </button>
      </div>

      {showAssumptions && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h4 className="font-medium text-primary-900 mb-2">
            How We Calculate Scenarios
          </h4>
          <ul className="space-y-2 text-sm text-primary-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Bear: Worst-case scenario based on market risks
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Base: Expected case using current growth rates
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Bull: Best-case scenario assuming successful execution
            </li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-semibold text-red-600">
              {predictions.bear}%
            </span>
            <span>🐻</span>
            <Tooltip content="Based on competitive pressures and market risks">
              <QuestionMarkCircleIcon className="w-4 h-4 text-red-400" />
            </Tooltip>
          </div>
          <ul className="space-y-2 text-sm text-red-700">
            {predictions.bearPoints.map((point, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-semibold text-gray-600">
              +{predictions.base}%
            </span>
            <span>⭕</span>
            <Tooltip content="Expected scenario based on current trajectory">
              <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            {predictions.basePoints.map((point, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-semibold text-green-600">
              +{predictions.bull}%
            </span>
            <span>🚀</span>
            <Tooltip content="Optimistic scenario assuming successful execution">
              <QuestionMarkCircleIcon className="w-4 h-4 text-green-400" />
            </Tooltip>
          </div>
          <ul className="space-y-2 text-sm text-green-700">
            {predictions.bullPoints.map((point, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
