import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function ScenarioChart({ stocks, investedAmount, timeRange }) {
  if (!stocks.length) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No Stocks Selected</p>
          <p className="text-sm">Select up to three stocks to view scenarios</p>
        </div>
      </div>
    )
  }

  const labels = Array.from({ length: timeRange * 12 + 1 }, (_, i) => i)
  
  const datasets = stocks.flatMap(stock => {
    const monthlyData = Array.from({ length: timeRange * 12 + 1 }, (_, month) => {
      const bearReturn = 1 + (stock.predictions.bear / 100 / 12)
      const baseReturn = 1 + (stock.predictions.base / 100 / 12)
      const bullReturn = 1 + (stock.predictions.bull / 100 / 12)

      return {
        bear: investedAmount * Math.pow(bearReturn, month),
        base: investedAmount * Math.pow(baseReturn, month),
        bull: investedAmount * Math.pow(bullReturn, month)
      }
    })

    return [
      {
        label: `${stock.ticker} Bear`,
        data: monthlyData.map(d => d.bear),
        borderColor: 'rgba(239, 68, 68, 0.7)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: `${stock.ticker} Base`,
        data: monthlyData.map(d => d.base),
        borderColor: 'rgba(59, 130, 246, 0.7)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: `${stock.ticker} Bull`,
        data: monthlyData.map(d => d.bull),
        borderColor: 'rgba(34, 197, 94, 0.7)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  })

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => 
            `${context.dataset.label}: $${context.raw.toLocaleString(undefined, { 
              maximumFractionDigits: 0 
            })}`
        },
        titleFont: {
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          family: "'Roboto', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          font: {
            family: "'Roboto', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Roboto', sans-serif"
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <div className="h-[400px]">
      <Line options={options} data={{ labels, datasets }} />
    </div>
  )
}
