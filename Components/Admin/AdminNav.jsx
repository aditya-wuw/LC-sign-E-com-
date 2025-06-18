import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaHome } from "react-icons/fa";

const AdminNav = ({user}) => {
    const router = useRouter()
    const goToHome = () =>{
        router.push('/')
    }
  return (
    <div className='border-b-1 border-black/40'>
        <div className='flex justify-between items-center md:mx-[20%] mx-2 p-4'>
            <p className='md:text-2xl text-sm flex items-baseline gap-2'> <FaHome onClick={goToHome} className='cursor-pointer md:pt-1 hover:text-yellow-600 transition-all duration-200'/>  <span>LC Sgins (Admin)</span></p>
            <nav className='flex gap-3 items-center'>
                <p>logged in as <span className='text-yellow-700'>{user?.firstName}</span> </p>
                <div>
                    <UserButton/>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default AdminNav