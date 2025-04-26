import React, { useEffect, useState } from "react";
import axios from "../../utilis/axios";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import SideNav from "./SideNav";
const TopNav = () => {
  const [query, setquery] = useState("");
  const [search, setsearch] = useState([]);
  const [navopen, setnavopen] = useState(false);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearch(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);
  return (
    <div className="w-[100%] h-[10vh] relative flex items-center">
      {navopen ? (
        <div
          className="w-full h-screen backdrop-blur-xl z-9999 absolute top-[0%]"
          onClick={() => setnavopen(false)}
        >
          <SideNav />
        </div>
      ) : (
        <div className="h-full w-[5%] p-5 mr-10 flex items-center lg:mr-105">
          <button onClick={() => setnavopen(true)}>
            <i className="ri-menu-line text-white text-3xl cursor-pointer"></i>
          </button>
        </div>
      )}
      <i className="text-zinc-400 ri-search-2-line cursor-pointer"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="search movies , tv shows & actors"
        className="text-black p-3 rounded-md mx-5 w-[50%] border-none outline-none transparent bg-zinc-300 lg:w-[25%]"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-xl ri-close-fill cursor-pointer ml-[5%]"
        ></i>
      )}
      <div className="absolute top-[100%] w-[90%] left-[5%] max-h-[50vh] bg-zinc-200 overflow-auto rounded-md z-999 lg:w-[35%] lg:left-[30%]">
        {search.map((movie, index) => (
          <Link
            to={`/${movie.media_type}/details/${movie.id}`}
            key={index}
            className="hover:text-black hover:bg-zinc-300 font-semibold w-full text-zinc-600 p-7 flex justify-start items-center border-b-2 border-zinc-100 duration-300"
          >
            <img
              className="w-[20vh] h-[20vh] object-cover rounded mr-10"
              src={
                movie.backdrop_path || movie.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      movie.backdrop_path || movie.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {movie.title ||
                movie.original_title ||
                movie.name ||
                movie.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
