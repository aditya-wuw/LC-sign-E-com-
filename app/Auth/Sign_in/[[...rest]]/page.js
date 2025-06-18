import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='absolute left-5'>
      <h1 className='text-outline-white text-6xl font-bold hover:ml-10 transition-all duration-200 cursor-pointer'>Welcome to LC Sgins</h1>
    </div>
    <div className='flex justify-center h-screen items-center'><SignIn/></div>
    </>
  )
}

export default page