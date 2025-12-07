import React from 'react'
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
}
export function Card({
  className = '',
  children,
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}
      {...props}
    >
      <div className={noPadding ? '' : 'p-4'}>{children}</div>
    </div>
  )
}
