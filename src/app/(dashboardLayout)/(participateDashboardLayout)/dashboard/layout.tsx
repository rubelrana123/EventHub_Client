import React from 'react'
export const dynamic = 'force-dynamic';
export default function layout({children} : { children :React.ReactNode}) {
  return (
    <div>
        {children}
    </div>
     
  )
}
