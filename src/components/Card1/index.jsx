import React from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import CompanyInfo from './CompanyInfo'
import AudioPlayer from './AudioPlayer'
import Scorecard from './Scorecard'
import Predictions from './Predictions'
import HistoricalChart from './HistoricalChart'

const defaultStock = {
  name: 'Apple Inc',
  ticker: 'AAPL',
  ceo: 'Tim Cook',
  hq: 'Cupertino, CA',
  industry: 'Consumer Electronics',
  metrics: {
    profitability: 10,
    companyViability: 10,
    marketPosition: 10,
    financialHealth: 10,
    trackRecord: 9,
    revenueQuality: 9,
    analystSentiment: 9,
    capitalAllocation: 9,
    outlook: 9,
    alignment: 8
  },
  advancedMetrics: {
    peRatio: '28.5',
    epsGrowth: '12.3',
    debtToEquity: '1.2',
    freeCashFlow: '92.95',
    operatingMargin: '30.2'
  },
  predictions: {
    bear: -3,
    bearPoints: ['Market share loss in key segments', 'Margin pressure from competition'],
    base: 2,
    basePoints: ['Stable growth in services', 'Continued premium positioning'],
    bull: 8,
    bullPoints: ['AR/VR device launches spark new product category', 'Services revenue leaps from streaming']
  },
  historicalData: [
    { date: '2023-01', price: 150.23 },
    { date: '2023-02', price: 155.48 },
    { date: '2023-03', price: 157.65 },
    { date: '2023-04', price: 169.59 },
    { date: '2023-05', price: 173.75 },
    { date: '2023-06', price: 180.95 },
    { date: '2023-07', price: 178.85 },
    { date: '2023-08', price: 182.34 },
    { date: '2023-09', price: 175.49 },
    { date: '2023-10', price: 170.77 },
    { date: '2023-11', price: 189.69 },
    { date: '2023-12', price: 193.58 }
  ]
}

export default function Card1() {
  const location = useLocation()
  const stockData = location.state?.stock || defaultStock

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-inter font-semibold text-gray-900">
          Stock Analysis
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Comprehensive analysis and predictions for {stockData.name}
        </p>
      </header>

      <div className="card p-6">
        <CompanyInfo stock={stockData} />
      </div>

      <div className="card p-6">
        <AudioPlayer />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="card p-6">
            <Scorecard 
              metrics={stockData.metrics} 
              advancedData={stockData.advancedMetrics}
            />
          </div>
          <div className="card p-6">
            <HistoricalChart historicalData={stockData.historicalData} />
          </div>
        </div>
        <div className="card p-6">
          <Predictions predictions={stockData.predictions} />
        </div>
      </div>
    </div>
  )
}
