import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const tempUnit = useSelector((state) => state.settings.tempUnit);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌤️</div>
            <h1 className="text-2xl font-bold text-gray-800">
              Weather Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Displaying in {tempUnit === "C" ? "Celsius" : "Fahrenheit"}
            </p>
          </div>

          {/* Navigation/Actions */}
          <nav className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition">
              Dashboard
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition">
              Settings
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
