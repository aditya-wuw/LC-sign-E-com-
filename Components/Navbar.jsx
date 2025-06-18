"use client";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShopping } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { countriesWithCurrency, NavData } from "@/data";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { RiAdminFill } from "react-icons/ri";
import { useStateContext } from "@/Context/context";
import axios from "axios";

const Navbar = () => {
  const [Sidebar, setSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { cart_items_total,getCount } = useStateContext();
  const handleSidebar = () => {
    setSidebar(!Sidebar);
    document.body.style.overflowY = !Sidebar ? "hidden" : "scroll";
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1350);
    };
    handleResize();
    getCount()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  const goToCart = () => {
    router.push("/cart");
    getCount();
  };
  const goTOAdmin = () => {
    router.push("/LC/Admin");
  };
  const handleRedirect = (data) => {
    if (data === "Home") {
      router.push("/");
    }
    if (data === "light box") {
      router.push("/LightBox");
    }
  };
  if (!isLoaded && !user) return null;
  return (
    <div
      className={`border-b-1 border-gray-500/20 relative z-10 ${user ? "block" : "hidden"} `}
    >
      <div className="w-full flex justify-center bg-orange-500/80 text-sm p-3 font-bold text-white text-center">
        <p>Illuminate Your Space With Our Exclusive Signage Solutions</p>
      </div>
      <div className="flex justify-between md:mx-[20%] mx-[2%] p-5">
        <div className="flex items-center gap-3">
          {isMobile && (
            <span onClick={handleSidebar}>
              {!Sidebar ? (
                <GiHamburgerMenu size={20} />
              ) : (
                <IoMdClose size={20} />
              )}
            </span>
          )}
          <p className="text-xl">LC signs</p>
        </div>
        {isMobile ? (
          <div>
            {Sidebar && (
              <div className="absolute z-20 left-0 top-[120%] w-full min-h-[530%] bg-white overflow-hidden">
                <div className="p-4">
                  <ul className="list-none block items-center h-full text-sm ">
                    {NavData.map((item, i) => (
                      <li
                        className="hover:underline cursor-pointer mb-5"
                        key={i}
                        onClick={() => handleRedirect(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <footer className="bg-gray-400/40 h-50 w-full p-4 absolute bottom-0">
                  <span>
                    <select
                      name="country"
                      className="p-2 rounded-none outline-0"
                    >
                      {countriesWithCurrency.map((item, i) => (
                        <option value="India" key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </span>
                </footer>
              </div>
            )}
          </div>
        ) : (
          <nav>
            <ul className="list-none flex items-center h-full text-sm gap-4">
              {NavData.map((item, i) => (
                <li
                  className="hover:underline cursor-pointer"
                  key={i}
                  onClick={() => handleRedirect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="flex items-center gap-3 md:relative">
          {user?.publicMetadata?.role && (
            <RiAdminFill
              onClick={goTOAdmin}
              className="cursor-pointer md:absolute right-25 size-5 hover:size-6 transition-all duration-100"
            />
          )}
            <CiSearch className="cursor-pointer md:absolute right-18 size-5 hover:size-6 transition-all duration-100" />
          <div className="flex gap-2 justify-center items-center p-2 rounded ">
            <AiOutlineShopping
              onClick={goToCart}
              className="cursor-pointer md:absolute right-10 size-5 hover:size-6 transition-all duration-100"
            />
            <span className="text-orange-500 relative left-4 bottom-2 font-bold text-xl">
              {cart_items_total}
            </span>
          </div>
          <div>{user ? <UserButton /> : null}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
