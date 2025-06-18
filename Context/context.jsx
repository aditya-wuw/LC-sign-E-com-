"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const [cart_items_total, settotal] = useState(0);
  const {user,isLoaded} = useUser()
  const getCount = async () => {
    if(isLoaded){
      const count = await axios.get('/API/Cart/itemCount/',{params:{_user: user.id}});
      settotal(count.data.message)
    }
  }
  return (
    <StateContext.Provider
      value={{
        cart_items_total
        ,getCount
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);

