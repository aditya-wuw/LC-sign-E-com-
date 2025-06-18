"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useStateContext } from "@/Context/context";

const page = () => {
  const [cart_items, setcart] = useState([]);
  const { user, isLoaded } = useUser();
  const {getCount} = useStateContext()
  const [checkout_details, setdetails] = useState({
    Shopping_price: 0,
    Coupon_discount: 10000,
    Tax: 1000,
    SubTotal: 0,
  });
  useEffect(() => {
    const Getcart = async () => {
      if (isLoaded) {
        const res = await axios.get("/API/Cart/GetCart/", {
          params: { _user: user.id },
        });
        setcart(res.data.message);
        console.log(cart_items);
      }
    };
    Getcart();
  }, [isLoaded]);

  useEffect(() => {
    let itemsincart = 0;
    cart_items.forEach(element => {
      itemsincart += 1; 
    });
    subtotal();
  }, [cart_items]);

  const deleteItem = async (id) => {
    setcart(cart_items.filter((items) => items.carts_id != id));
    const res = await axios.delete(`/API/Cart/Delete_cart/${id}`);
    getCount();
    toast(res.data.message);
  };

  const Quantity = async (is, carts_id, id) => {
    if (is === "+") {
      await axios.put("/API/Cart/Quant/", {
        cartsid: carts_id,
        user_id: user.id,
        operator: is,
      });
      let updated_cart = cart_items.map((i, index) => {
        if (id == index) {
          return { ...i, quantity: Math.max(i.quantity + 1) };
        }
        return i;
      });
      setcart(updated_cart);
    } 
    else if (is === "-") {
      await axios.put("/API/Cart/Quant/", {
        cartsid: carts_id,
        user_id: user.id,
        operator: is,
      });
      let updated_cart = cart_items.map((i, index) => {
        if (id == index) {
          return { ...i, quantity: Math.max(i.quantity - 1, 1) };
        }
        return i;
      });
      setcart(updated_cart);
    } else {
      alert("Error somthing went wrong");
    }
  };

  const subtotal = () => {
    let Shoptotal = 0;
    cart_items.forEach((element) => {
      Shoptotal += Number(element?.item_details?.Price) * element.quantity;
    });
    let Total =
      Shoptotal - checkout_details.Coupon_discount + checkout_details.Tax;
    setdetails((prev) => ({
      ...prev,
      Shopping_price: Shoptotal,
      SubTotal: Total,
    }));
  };

  return (
    <div className="relative">
      {cart_items.length === 0 ? (
        <div className="flex justify-center">
          <span className="mt-10 p-10 bg-gray-200 text-4xl font-bold w-[60%]">
            No items in the cart
          </span>
        </div>
      ) : (
        <div className="md:flex justify-center md:mx-10 mx-2 gap-5 mt-5">
          <ToastContainer
            progressClassName="progressbar"
            className="progressbar"
          />
          <div className="flex flex-col h-[20%] md:w-[50%] justify-center items-start">
            {cart_items.map((i, index) => (
              <div
                key={index}
                className="gap-3 md:ml-[15%] flex bg-gray-200 rounded-2xl md:w-[80%] m-2 justify-between p-5"
              >
                <div className="flex items-center gap-5">
                  <div className="flex flex-col ">
                    <span>{i?.item_details?.Item_name}</span>
                    <span>
                      <span className="relative bottom-1">₹</span>
                      <span className="text-2xl font-bold">
                        {Number(i?.item_details?.Price).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="button_container flex items-center">
                  <div className="Quantity_button flex items-center bg-gray-500 p-3 m-2 rounded-2xl text-white gap-2">
                    <span>Quantity {i.quantity}</span>
                    <button
                      className="rounded-full hover:text-black hover:text-2xl cursor-pointer"
                      onClick={() => {
                        Quantity("+", i.carts_id, index);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="rounded-full hover:text-black hover:text-2xl cursor-pointer"
                      onClick={() => {
                        Quantity("-", i.carts_id, index);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => deleteItem(i.carts_id)}
                  >
                    <MdDelete size={"25px"} className="hover:text-red-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:min-w-100 h-90 p-2 bg-gray-200/90 mb-10 relative">
            <div className="flex flex-col mx-5 my-5 gap-2">
              <span className="text-xl font-bold">Promo code</span>
              <form className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your code"
                  className="border bg-white border-gray-400 outline-none px-5"
                />
                <button
                  type="submit"
                  className="p-2 bg-orange-500 hover:bg-amber-500 text-white rounded cursor-pointer"
                >
                  APPLY
                </button>
              </form>
            </div>
            <div className="flex justify-between mx-5 text-gray-500">
              <div className="flex flex-col gap-2">
                <span>Shopping Cost</span>
                <span>Discount</span>
                <span>GST & TAX</span>
              </div>
              <div className="flex flex-col gap-2 text-end">
                <span>
                  ₹ {checkout_details.Shopping_price.toLocaleString()}
                </span>
                <span className="text-red-500">
                  {checkout_details.Coupon_discount == 0
                    ? "---"
                    : `-₹ ${checkout_details?.Coupon_discount.toLocaleString()}`}
                </span>
                <span>₹ {checkout_details.Tax.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between px-5 border-t border-gray-500 mt-5 text-xl font-bold">
              <p className="text-black mt-4">Estemated Total</p>
              <span className="mt-4">
                ₹{checkout_details.SubTotal.toLocaleString()}
              </span>
            </div>
            <button className="p-2 bg-orange-400 text-white rounded cursor-pointer hover:bg-amber-400 md:w-96 w-[95%] absolute bottom-3">
              Check out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
