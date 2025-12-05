 "use client"
import { Menu, X, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useState } from 'react'
 
export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false)
 
  const navLinks = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Events',
      path: '/events',
    },
    {
      name: 'Services',
      path: '/services',
    },
    {
      name: 'Subscription',
      path: '/subscription',
    },
  ]
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(path)
  }
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#ff4000] p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-[#444444]">
                EventPlanner
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path) ? 'text-[#ff4000]' : 'text-[#444444] hover:text-[#ff4000]'}`}
              >
                {link.name}
              </Link>
            ))}
            <Button size="sm" variant="default">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#ff4000] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff4000]"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-100 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? 'text-[#ff4000] bg-orange-50' : 'text-[#444444] hover:text-[#ff4000] hover:bg-gray-50'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <Button   size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
