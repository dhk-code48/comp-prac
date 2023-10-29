import React, { FC } from 'react'

const Breadcrumbs:FC = () => {
  return (
    <div className='flex justify-center items-center gap-4 text-sm'>
         
         <p className='text-gray-500 cursor-pointer hover:underline'>Worksheet /  </p>
         <p className='hover:underline cursor-pointer'>Javascript /</p>
    </div>

  )
}

export default Breadcrumbs