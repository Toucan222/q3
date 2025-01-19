import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function HistoricalChart({ historicalData }) {
  const [timeRange, setTimeRange] = useState('1Y')
  
  const timeRanges = {
    '1Y': { months: 12, interval: 1 },
    '5Y': { months: 60, interval: 3 },
    '10Y': { months: 120, interval: 6 }
  }

  const currentRange = timeRanges[timeRange]
  const filteredData = historicalData.slice(-currentRange.months)
  const labels = filteredData.map(d => d.date)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        data: filteredData.map(d => d.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">Historical Performance</h3>
        <div className="flex space-x-2">
          {Object.keys(timeRanges).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-1 text-sm rounded ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
