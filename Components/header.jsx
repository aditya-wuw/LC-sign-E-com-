import Image from "next/image";
import React from "react";
import LightboxImage from "../public/A2-1.jpg";
const Header = () => {
  return (
    <div>
      <div className="md:flex md:mx-[20%] mx-5 justify-center h-full md:mt-10 mt-5">
        <div className="text-start md:mt-10">
          <h1 className="text-3xl font-bold">Light Boxes</h1>
          <p className="mb-5 mt-5">
            LED light boxes are typically used for advertising or informational
            purposes, and can be found in a variety of settings, from retail
            stores to train stations.
          </p>
          <p>
            We offer light box signs which is equipped with bright LED lights
            that uniformly enlighten your visual to catch your customers’
            attention.
          </p>
        </div>
        <div>
          <Image width={1800} src={LightboxImage} alt="lightbox" />
        </div>
      </div>
    </div>
  );
};

export default Header;
