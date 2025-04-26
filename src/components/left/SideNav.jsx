import React from "react";
import { Link } from "react-router-dom";
const SideNav = () => {
  return (
    <div className="w-[60%] h-screen border-r-2 border-zinc-200 pl-10 pt-5 bg-[#1f1e24] lg:w-[20%]">
      <h1 className="text-lg font-bold text-white">
        <i className="ri-tv-fill text-[#6556cd] mr-3"></i>
        <span>ADB.</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-md gap-2">
        <h1 className="text-white text-lg font-semibold mt-10 mb-2">
          New Feeds
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5"
        >
          <i className="ri-fire-fill mr-3"></i>Trending
        </Link>
        <Link
          to={"/popular"}
          className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5"
        >
          <i className="mr-3 ri-bard-fill"></i>
          Popular
        </Link>
        <Link
          to={"/movie"}
          className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5"
        >
          <i className="mr-3 ri-movie-2-fill"></i>
          Movies
        </Link>
        <Link
          to={"/tv"}
          className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5"
        >
          <i className="mr-3 ri-tv-2-fill"></i>
          Tv Shows
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5"
        >
          <i className="mr-3 ri-user-community-fill"></i>
          People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400 mt-5" />
      <nav className="flex flex-col text-zinc-400 text-md gap-2">
        <h1 className="text-white text-lg font-semibold mt-10 mb-2">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5">
          <i className="mr-3 ri-information-2-fill"></i>About ADB
        </Link>
        <Link className="hover:bg-[#6556cd] rounded-xl hover:text-white duration-300 w-[70%] py-3 pl-5">
          <i className="mr-3 ri-phone-fill"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
