import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTempUnit, setTempUnit } from '../store/slices/settingsSlice'

function Settings() {
  const dispatch = useDispatch()
  const tempUnit = useSelector((state)=> state.settings.tempUnit)

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Settings
      </h2>
      
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Temperature Unit</h3>
          
          {/* Radio buttons for unit selection */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tempUnit"
                value="C"
                checked={tempUnit === 'C'}
                onChange={(e) => dispatch(setTempUnit(e.target.value))}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Celsius (°C)</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tempUnit"
                value="F"
                checked={tempUnit === 'F'}
                onChange={(e) => dispatch(setTempUnit(e.target.value))}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Fahrenheit (°F)</span>
            </label>
          </div>
          
          {/* Toggle button alternative */}
          <button
            onClick={() => dispatch(toggleTempUnit())}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Toggle to {tempUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
        
        {/* Current setting display */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Current setting: <strong>{tempUnit === 'C' ? 'Celsius' : 'Fahrenheit'}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
