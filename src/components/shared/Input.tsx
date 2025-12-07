/* eslint-disable react-hooks/rules-of-hooks */
import React, { useId } from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}
export function Input({
  className = '',
  label,
  error,
  id,
  ...props
}: InputProps) {
  const inputId = id || useId()
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#444444] mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          flex h-10 w-full rounded-t-md border-b-2 border-[#ededed] bg-[#f0f0f0] px-3 py-2 text-sm text-[#444444] 
          placeholder:text-gray-400 
          focus-visible:outline-none focus-visible:border-[#ff4e4e] focus-visible:bg-white transition-colors
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
