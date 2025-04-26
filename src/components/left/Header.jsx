import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Header = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[30vh] lg:h-[60vh]"
    >
      {data.map((data, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.2), 
                rgba(0, 0, 0, 0.5), 
                rgba(0, 0, 0, 0.8)
              ), url(https://image.tmdb.org/t/p/original/${
                data?.backdrop_path || data?.profile_path
              })`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
            }}
            className="w-full h-[30vh] flex flex-col justify-end items-start p-[3%] lg:h-[60vh]"
          >
            <h1 className="text-2xl w-[60%] font-black text-white lg:text-5xl">
              {data.name ||
                data.original_name ||
                data.title ||
                data.original_title}
            </h1>
            <p className="text-md w-[50%] mt-3 tracking-tight text-white mb-3">
              {data.overview
                ? window.innerWidth <= 640
                  ? data.overview.slice(0, 10) 
                  : data.overview.slice(0, 200) 
                : "No description available."}{" "}
              ...
              <Link
                to={`/${data.media_type}/details/${data.id}`}
                className="text-blue-300"
              >
                more
              </Link>
            </p>

            <p className="text-white text-sm lg:text-md">
              <i className="ri-album-fill text-amber-400 mr-2"></i>
              {data.release_date || "Not Available"}
              <i className="ml-5 ri-megaphone-fill text-amber-400 mr-2"></i>
              {data.media_type ? data.media_type.toUpperCase() : "Loading..."}
            </p>
            <Link
              to={`/${data.media_type}/details/${data.id}/trailer`}
              className="p-1.5 font-semibold mt-3 rounded-md text-sm text-white bg-[#6556CD] lg:p-2.5"
            >
              Watch Trailer
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Header;
