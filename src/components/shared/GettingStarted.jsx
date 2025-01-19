import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export function GettingStarted() {
  const [show, setShow] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to Sentinel Flash',
      description: 'Your comprehensive stock research tool. Let\'s take a quick tour of the features.',
      image: '🎯'
    },
    {
      title: 'Company Analysis',
      description: 'View detailed company metrics, listen to analysis, and see predictions for future performance.',
      image: '📊'
    },
    {
      title: 'Stock Comparison',
      description: 'Compare multiple stocks using our comprehensive metrics table.',
      image: '📈'
    },
    {
      title: 'Investment Scenarios',
      description: 'Model different investment scenarios and see potential returns.',
      image: '💰'
    }
  ]

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Getting Started</h2>
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center py-6">
          <div className="text-4xl mb-4">{steps[currentStep].image}</div>
          <h3 className="text-lg font-medium mb-2">{steps[currentStep].title}</h3>
          <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(current => current - 1)}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm text-blue-600 disabled:text-gray-400"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(current => current + 1)}
              className="px-4 py-2 text-sm text-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShow(false)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
