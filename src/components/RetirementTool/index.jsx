import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function RetirementTool() {
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [years, setYears] = useState(20)
  const [growthRate, setGrowthRate] = useState(7)
  const targetAmount = 1000000

  // Simple compound interest calculation
  const calculateFutureValue = () => {
    const monthlyRate = growthRate / 100 / 12
    const months = years * 12
    const futureValue = monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
    return Math.round(futureValue)
  }

  const futureValue = calculateFutureValue()
  const progressPercentage = Math.min((futureValue / targetAmount) * 100, 100)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-inter font-bold text-gray-900 mb-2">
          The Retirement Countdown
        </h1>
        <p className="text-gray-600">
          See how your monthly investments grow over time
        </p>
      </header>

      <div className="grid gap-8">
        {/* Progress Meter */}
        <div className="card p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            ${futureValue.toLocaleString()}
          </h2>
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1 }}
              className="absolute h-full bg-primary-600 rounded-full"
            />
          </div>
          <p className="mt-2 text-gray-600">
            {progressPercentage >= 100 
              ? "You've reached your goal! 🎉" 
              : `${Math.round(progressPercentage)}% to $${targetAmount.toLocaleString()} goal`}
          </p>
        </div>

        {/* Controls */}
        <div className="card p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution: ${monthlyContribution}
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
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
                max="40"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return: {growthRate}%
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center">
          <button
            onClick={() => {
              // In a real app, this would integrate with social media sharing
              alert(`I'm on track to save $${futureValue.toLocaleString()} by ${new Date().getFullYear() + years}!`)
            }}
            className="btn btn-primary"
          >
            Share My Progress! 🚀
          </button>
        </div>
      </div>
    </div>
  )
}
