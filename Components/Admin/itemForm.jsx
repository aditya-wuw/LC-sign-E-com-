"use client";
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
const ItemForm = ({setOpenForm,setlist,defaultval,setdef,setloading}) => {
    const { register, handleSubmit,reset } = useForm()
    useEffect(()=>{
        reset(defaultval)
    },[defaultval])

    const onSubmit = async (data) => {
        setloading(true);
        setOpenForm(false);
        window.location.reload();
        setlist((prev)=>[...prev,data]);
        await axios.post('/API/insert/',data);
        reset();
    }
    const handleClose = () =>{
        setOpenForm(false);
        setdef(null)
    }
  return (
    <div className='absolute bg-white md:bottom-80 bottom-60 z-10'>
        <div className='md:w-100 md:h-100 w-80 h-80 border-1 p-2'>
            <div className='flex justify-between mx-2'>
                <p>Add new item to the list</p>
                <span className='bg-red-400 px-2 py-1 text-center rounded-4xlcursor-pointer items-center' onClick={handleClose}>x</span>
            </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
            <input placeholder='item name' className='border-b-1 outline-none' {...register("Item_name", { required: true, maxLength: 20 })} />
            <input placeholder='price' type='number' className='border-b-1 w-20 ml-5 outline-none' {...register("Price", { required: true })} />
            <textarea placeholder='Item description' className='border-1 outline-none p-3 mt-4 w-full md:h-55 h-35 mb-5' {...register("Item_desc",{required:true})}/>
            <input type="submit" className='border-2 rounded-xl p-2 bg-blue-300 cursor-pointer hover:bg-blue-600 transition-bg  duration-150'  />
        </form>
        </div>
    </div>
  )
}

export default ItemForm
