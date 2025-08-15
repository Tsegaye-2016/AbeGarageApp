import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/imges/logo.png'
import { useAuth } from '../../../Context/AuthContext'
import loginService from '../../../services/login.service'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

function Header() {
  const { isLogged, setIsLogged, employee } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    loginService.logoutEmployee()
    setIsLogged(false)
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div>
          <span className="font-semibold text-yellow-400">Garage Management System</span> — Mon–Sat: 7:00AM – 6:00PM
        </div>
        <div>
          {isLogged ? (
            <span>Welcome, <strong>{employee?.employee_first_name}</strong></span>
          ) : (
            <span>Schedule Appointment: <strong>09 13 89 63 19</strong></span>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-white">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Garage Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-800 font-medium">
          <Link to="/admin" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <Link to="/services" className="hover:text-blue-600">Services</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
        </nav>

        {/* Login / Logout */}
        <div className="hidden md:block">
          {isLogged ? (
            <Link to="/" onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Logout</Link>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8 text-gray-700 cursor-pointer" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-gray-700 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white border-t border-gray-200 shadow">
          <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">About Us</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Services</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">Contact Us</Link>
          {isLogged ? (
            <Link to="/" onClick={handleLogout} className="block bg-red-600 text-white px-4 py-2 rounded text-center hover:bg-red-700">Logout</Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700">Login</Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
