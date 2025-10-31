import React from 'react'

function Footer() {
  return (
     <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © 2025 Weather Dashboard. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition">
              About
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
