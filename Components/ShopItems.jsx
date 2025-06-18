"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Placeholder from "../public/placeholder-614.webp";
import { FaCrown } from "react-icons/fa6";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import { useStateContext } from "@/Context/context";
const ShopItems = () => {
  const [listedItems, setListed] = useState([]);
  const {user,isLoaded} = useUser()
  const {getCount} = useStateContext();
  useEffect(() => {
    async function fetchdata(){
      const res = await axios.get('/API/Show/')
      setListed(res.data.message);
    }
    fetchdata();
  }, []);
  const handlecart = async (_id) =>{
    if(isLoaded){
      const res  = await axios.post('/API/Cart/PostCart/', {item_id : _id, _user : user.id });
      getCount();
      toast(res.data.message)
    }
    else{
      prompt("somthing went wrong or session expired reload the page !")
    }
  }
  return (
    <div className="md:mx-[20%] mx-5 grid md:grid-cols-4 grid-cols-1 md:gap-x-10 md:w-[58vw] gap-x-20 w-[90vw]">
      {listedItems.map((listedItems, i) => (
        <div
          className="item w-80 md:w-50 [&>*]:mt-2 mb-20 relative"
          key={listedItems.id}
        >
          <div>
            <Image
              className="object-cover w-full"
              src={Placeholder}
              alt="image"
            />
          </div>
          <p>{listedItems.item_details?.Item_name}</p>
          <p className="text-orange-600 font-bold">₹ {Number(listedItems.item_details?.Price).toLocaleString()}</p>
          <span className="flex items-center gap-3">
            <span>
              <FaCrown color="#fca103" />
            </span>
            <p className="text-gray-400"> guaranteed money back</p>
          </span>
          <button
            type="button"
            className="p-3 absolute border-gray-500 border-1 rounded-xl w-full cursor-pointer hover:border-2 transition-all duration-200"
            onClick={()=>handlecart(listedItems.id)}
          >
            <span>Add to cart</span>
          </button>
        </div>
      ))}
      <ToastContainer progressClassName="progressbar" className="progressbar"/>
    </div>
  );
};

export default ShopItems;
