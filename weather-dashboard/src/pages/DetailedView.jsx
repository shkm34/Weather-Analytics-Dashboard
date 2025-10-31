import React from 'react'

function DetailedView() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        City Details
      </h2>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600">
          Detailed forecast will go here (7-day, hourly, charts)
        </p>
      </div>
    </div>
  )
}

export default DetailedView
