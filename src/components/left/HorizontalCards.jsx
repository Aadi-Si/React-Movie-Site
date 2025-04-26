import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
const HorizontalCards = React.memo(({ data }) => {
  return (
    <div
      className="w-[100%] h-[60vh] flex items-center overflow-y-hidden rounded-xl pl-7 gap-7"
      style={{
        willChange: "transform",
      }}
    >
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            className="min-w-[73%] h-[90%] rounded-xl overflow-hidden bg-zinc-900 lg:min-w-[15%]"
            key={i}
          >
            <div className="w-full h-[75%]">
              <img
                loading="lazy"
                className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 hover:scale-110"
                src={
                  d?.poster_path || d?.backdrop_path || d?.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.poster_path || d.backdrop_path || d.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
            </div>
            <div className="text-white rounded-xl h-[25%] p-2 pl-5">
              <h1 className="text-lg font-bold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm mt-2 tracking-tight">
                {d.overview
                  ? d.overview.slice(0, 50)
                  : "No description available."}{" "}
                ... <span className="text-zinc-500">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-white font-black text-3xl text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
});

export default HorizontalCards;
