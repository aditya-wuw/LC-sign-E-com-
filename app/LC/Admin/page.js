"use client";
import AdminNav from "@/Components/Admin/AdminNav";
import ListingItems from "@/Components/Admin/ListingItems";
import ProtectedRoute from "@/Context/ProtectedRoute";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners"
const page = () => {
  const {user, isLoaded} = useUser();
  if(!isLoaded) return null;
  return (
    <>
      <ProtectedRoute allowedRoles={['Admin']} >
        {
          user.publicMetadata.role == "Admin" ?
          <>
           <AdminNav user={user}/>
           <ListingItems />
         </> 
        : 
        <div className="w-screen h-screen items-center flex justify-center gap-3"> <ClipLoader /> <p> Don't have access , Retruning to home page
          </p></div>
        }
      </ProtectedRoute>
    </>
  );
};

export default page;
