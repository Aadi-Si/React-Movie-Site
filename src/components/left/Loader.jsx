import React from "react";
import loader from "/loader3.gif";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[40%] object-cover lg:h-[60%]" src={loader} alt="" />
    </div>
  );
};

export default Loader;
