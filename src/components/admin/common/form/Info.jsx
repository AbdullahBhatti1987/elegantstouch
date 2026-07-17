import React from 'react'

export function Info({label,value}) {
 return (
  <div>
   <p className="text-sm text-gray-500">
    {label}
   </p>

   <p className="font-medium">
    {value || '-'}
   </p>
  </div>
 )
}

