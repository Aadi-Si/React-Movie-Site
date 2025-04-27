import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
const VerticalCards = React.memo(({ data, title }) => {
  return (
    <div
      className="flex flex-wrap gap-5 p-5 w-full bg-[#1f1e24] px-[9.5%] lg:gap-15 lg:p-15 lg:px-[7%]"
      style={{
        willChange: "transform",
      }}
    >
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          className="relative w-[17.9vh] mb-5 lg:w-[25vh]"
          key={i}
        >
          <img
            className="h-[28vh] object-cover rounded-xl mb-3 transform transition-transform duration-300 hover:scale-110 lg:h-[35vh]"
            loading="lazy"
            src={
              d?.poster_path || d?.backdrop_path || d?.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    d.poster_path || d.backdrop_path || d.profile_path
                  }`
                : noimage
            }
            alt=""
          />
          <h1 className="text-zinc-300 text-md font-semibold text-center">
            {d.name || d.title || d.original_name || d.original_title}
          </h1>
          {d.vote_average && (
            <div className="absolute right-[-10%] bottom-[25%] text-white bg-yellow-600 rounded-full w-[4vh] h-[4vh] flex items-center justify-center font-bold text-md lg:right-[-10%] lg:bottom-[25%] lg:w-[6vh] lg:h-[6vh]">
              {(d.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
});

export default VerticalCards;
