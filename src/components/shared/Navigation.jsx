import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiBarChartAlt2, BiLineChart, BiPieChart, BiMenu } from 'react-icons/bi'
import { motion } from 'framer-motion'

export default function Navigation({ isExpanded, onToggle }) {
  const navItems = [
    { path: '/', icon: BiBarChartAlt2, label: 'Analysis' },
    { path: '/card2', icon: BiLineChart, label: 'Stocks' },
    { path: '/card3', icon: BiPieChart, label: 'Scenarios' },
  ]

  return (
    <motion.nav
      initial={false}
      animate={{ width: isExpanded ? 256 : 64 }}
      className="relative bg-white border-r border-gray-200 flex flex-col"
    >
      <button
        onClick={onToggle}
        className="absolute right-0 top-4 transform translate-x-1/2 bg-white rounded-full p-1.5 border border-gray-200 text-gray-500 hover:text-gray-700"
      >
        <BiMenu size={20} />
      </button>

      <div className="p-4">
        <img
          src="/logo.svg"
          alt="Sentinel Flash"
          className={`h-8 ${isExpanded ? 'w-auto' : 'w-8'}`}
        />
      </div>

      <div className="flex-1 px-2 py-4 space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
            }
          >
            <Icon size={24} />
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3 font-medium"
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
