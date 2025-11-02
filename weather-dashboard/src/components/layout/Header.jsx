import {useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

   const NavButtons = ({ mobile = false }) => (
    <>
      <button 
        onClick={() => {
          handleDashboardNav();
          if (mobile) setIsMobileMenuOpen(false);
        }} 
        className={`transition ${
          mobile 
            ? 'block w-full text-left px-4 py-3 text-base' // Mobile styles
            : 'px-4 py-2 rounded-lg' // Desktop styles
        } ${
          isActive('/') 
            ? (mobile ? 'bg-blue-100 text-blue-700' : 'bg-blue-500 text-white')
            : (mobile ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50')
        }`}
      >
        Dashboard
      </button>
      <button 
        onClick={() => {
          handleSettingsNav();
          if (mobile) setIsMobileMenuOpen(false);
        }} 
        className={`transition ${
          mobile 
            ? 'block w-full text-left px-4 py-3 text-base' // Mobile styles
            : 'px-4 py-2 rounded-lg' // Desktop styles
        } ${
          isActive('/settings') 
            ? (mobile ? 'bg-blue-100 text-blue-700' : 'bg-blue-500 text-white')
            : (mobile ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50')
        }`}
      >
        Settings
      </button>
    </>
  );


  return (
   <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Main header bar */}
        <div className="flex items-center justify-between">
          
          {/* Left Side: Logo, Title, and Subtitle */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌤️</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <h1 
                onClick={() => {
                  handleDashboardNav();
                  setIsMobileMenuOpen(false);
                }} 
                className="text-xl sm:text-2xl font-bold text-gray-800 cursor-pointer"
              >
                Weather Dashboard
              </h1>
              {/* Subtitle: Hidden on very small screens (xs) to save space */}
              <p className="text-xs text-gray-500 hidden sm:block">
                Displaying in {tempUnit === "C" ? "Celsius" : "Fahrenheit"}
              </p>
            </div>
          </div>

          {/* Right Side: Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-4">
            <NavButtons mobile={false} />
          </nav>

          {/* Right Side: Mobile Menu Button (Hidden on desktop) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // X (Close) Icon
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger (Menu) Icon
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Conditionally rendered) */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-200 mt-4">
            <p className="sm:hidden text-xs text-gray-500 px-4 pb-3">
              Displaying in {tempUnit === "C" ? "Celsius" : "Fahrenheit"}
            </p>
            <nav className="flex flex-col gap-1">
              <NavButtons mobile={true} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
