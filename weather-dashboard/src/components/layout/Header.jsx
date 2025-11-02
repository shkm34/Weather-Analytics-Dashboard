import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const tempUnit = useSelector((state) => state.settings.tempUnit);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path

  const handleDashboardNav = () => {
    navigate('/dashboard');
  };

  const handleSettingsNav = () => {
    navigate('/settings');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌤️</div>
            <h1 onClick={handleDashboardNav} className="text-2xl font-bold text-gray-800">
              Weather Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Displaying in {tempUnit === "C" ? "Celsius" : "Fahrenheit"}
            </p>
          </div>

          {/* Navigation/Actions */}
          <nav className="flex items-center gap-4">
            <button onClick={handleDashboardNav} className={`px-4 py-2 rounded-lg transition ${
                isActive('/') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}>
              Dashboard
            </button>
            <button onClick={handleSettingsNav} className={`px-4 py-2 rounded-lg transition ${
                isActive('/settings') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}>
              Settings
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
