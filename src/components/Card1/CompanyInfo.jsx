import React from 'react'
import { BuildingOfficeIcon, GlobeAmericasIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function CompanyInfo({ stock = {} }) {
  const {
    name = 'Company Name',
    ticker = 'TICK',
    ceo = 'CEO Name',
    hq = 'Location',
    industry = 'Industry'
  } = stock

  return (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold font-inter text-primary-600">
            {ticker.charAt(0)}
          </span>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center space-x-3 mb-2">
          <h2 className="text-xl font-inter font-semibold text-gray-900">
            {name}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {ticker}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <UserCircleIcon className="w-4 h-4 mr-2" />
            <span>CEO: {ceo}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BuildingOfficeIcon className="w-4 h-4 mr-2" />
            <span>HQ: {hq}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <GlobeAmericasIcon className="w-4 h-4 mr-2" />
            <span>{industry}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex-shrink-0">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          2024: +7.8%
        </div>
      </div>
    </div>
  )
}
