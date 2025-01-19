import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { 
  BiBarChartAlt2, 
  BiLineChart, 
  BiPieChart, 
  BiCalculator, 
  BiTrendingUp, 
  BiLayer,
  BiDollar,
  BiMoney 
} from 'react-icons/bi'
import Card1 from './components/Card1'
import Card2 from './components/Card2'
import Card3 from './components/Card3'
import RetirementTool from './components/RetirementTool'
import IndexComparator from './components/IndexComparator'
import PortfolioMixer from './components/PortfolioMixer'
import EarningsChecker from './components/EarningsChecker'
import DividendVisualizer from './components/DividendVisualizer'

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-16 bg-white shadow-lg">
        <div className="flex flex-col items-center py-4 space-y-4">
          {/* Previous NavLinks */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiBarChartAlt2 size={24} />
          </NavLink>
          <NavLink
            to="/card2"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiLineChart size={24} />
          </NavLink>
          <NavLink
            to="/card3"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiPieChart size={24} />
          </NavLink>
          <NavLink
            to="/retirement"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiCalculator size={24} />
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiTrendingUp size={24} />
          </NavLink>
          <NavLink
            to="/mixer"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiLayer size={24} />
          </NavLink>
          <NavLink
            to="/earnings"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiDollar size={24} />
          </NavLink>
          <NavLink
            to="/dividends"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <BiMoney size={24} />
          </NavLink>
        </div>
      </nav>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg h-full overflow-auto">
          <Routes>
            <Route path="/" element={<Card1 />} />
            <Route path="/card2" element={<Card2 />} />
            <Route path="/card3" element={<Card3 />} />
            <Route path="/retirement" element={<RetirementTool />} />
            <Route path="/compare" element={<IndexComparator />} />
            <Route path="/mixer" element={<PortfolioMixer />} />
            <Route path="/earnings" element={<EarningsChecker />} />
            <Route path="/dividends" element={<DividendVisualizer />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
