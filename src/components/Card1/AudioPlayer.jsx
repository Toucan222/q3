import React, { useState } from 'react'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState('1x')
  const speeds = ['1x', '1.5x', '2x']

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-inter font-medium text-gray-900">
          Analysis Overview
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Speed:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                speed === s 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>

          <div className="flex-grow">
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute h-2 bg-primary-600 rounded-full"
                style={{ width: '33%' }}
              />
              <div 
                className="absolute h-4 w-4 bg-white border-2 border-primary-600 rounded-full -top-1 cursor-pointer"
                style={{ left: '33%' }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>2:21</span>
              <span>7:05</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
