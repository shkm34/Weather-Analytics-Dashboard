import React from 'react'

function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Cities
      </h2>
      
      {/* Weather cards will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="bg-white rounded-xl shadow-md p-6 h-48 flex items-center justify-center"
          >
            <p className="text-gray-400">Weather Card {i}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
