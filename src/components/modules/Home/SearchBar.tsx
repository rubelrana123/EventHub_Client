import React from 'react'
import { Search } from 'lucide-react'
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}
export function SearchBar({
  className = '',
  onSearch,
  ...props
}: SearchBarProps) {
  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-[#f4f4f4] text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ff4000] focus:border-transparent transition-colors duration-200 sm:text-sm"
        placeholder="Search events..."
        {...props}
      />
    </div>
  )
}
