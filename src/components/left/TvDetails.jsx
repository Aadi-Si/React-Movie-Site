import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../../store/actions/tvActions";
import Loader from "./Loader";
import HorizontalCards from "./HorizontalCards";
import noimage from "/noimage.jpg";
const TvDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.8)
    ), url(https://image.tmdb.org/t/p/original/${info.detail?.backdrop_path})`,
        backgroundPosition: "top-center",
        backgroundSize: "cover",
        willChange: "transform",
      }}
      className="relative w-screen h-screen overflow-y-auto px-[10%]"
    >
      <nav className="h-[10vh] w-full text-white flex items-center gap-10 text-xl px-6">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xl ri-arrow-left-line font-semibold text-zinc-400 hover:text-[#6556cd] mr-5"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          className="font-bold"
        >
          IMDb
        </a>
      </nav>
      <hr className="border-2 border-zinc-400 w-[95%] mx-auto" />
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className=" w-full h-[80vh] px-7 pt-10 lg:w-[25%] lg:h-[90vh]">
          <img
            className="h-[50vh] object-cover rounded-xl mb-3"
            loading="lazy"
            src={
              info.detail?.poster_path || info.detail?.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${
                    info.detail.poster_path || info.detail.backdrop_path
                  }`
                : noimage
            }
            alt=""
          />
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-7 items-center text-zinc-300">
              <h1 className="font-semibold ml-3">Available to flatrate :</h1>
              <img
                title={info.watchproviders.flatrate[0].provider_name}
                loading="lazy"
                className="w-[5vh] h-[5vh] object-cover rounded-md mt-5"
                src={`https://image.tmdb.org/t/p/original/${info.watchproviders.flatrate[0].logo_path}`}
                alt=""
              />
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-7 items-center text-zinc-300">
              <h1 className="font-semibold ml-3 mr-4.5">Available to Rent :</h1>
              <img
                title={info.watchproviders.rent[0].provider_name}
                loading="lazy"
                className="w-[5vh] h-[5vh] object-cover rounded-md mt-5"
                src={`https://image.tmdb.org/t/p/original/${info.watchproviders.rent[0].logo_path}`}
                alt=""
              />
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-7 items-center text-zinc-300">
              <h1 className="font-semibold ml-3 mr-5.5">Available to buy :</h1>
              <img
                title={info.watchproviders.buy[0].provider_name}
                loading="lazy"
                className="w-[5vh] h-[5vh] object-cover rounded-md mt-5"
                src={`https://image.tmdb.org/t/p/original/${info.watchproviders.buy[0].logo_path}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className=" w-full h-[90vh]  lg:w-[75%] lg:pt-10">
          <div className="content mb-15">
            <h1 className="text-white text-5xl font-black">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}
              <small className="text-2xl font-bold text-white ml-3">
                ({info.detail.first_air_date.split("-")[0]})
              </small>
            </h1>
            <div className="flex text-white items-center gap-x-3 mt-3 mb-2.5">
              <div className="w-full">
                <div className="relative mb-1 py-3">
                  <h1 className="font-bold text-2xl leading-6">
                    User Score
                    <span className=" text-white bg-yellow-600 rounded-full w-[7vh] h-[7vh] flex items-center justify-center font-bold text-md mt-3">
                      {(info.detail.vote_average * 10).toFixed()}
                      <sup>%</sup>
                    </span>
                  </h1>
                </div>
                <h1 className="font-semibold text-white">
                  Release : {info.detail.release_date}
                </h1>
                <h1 className="font-semibold text-white">
                  Genres : {info.detail.genres.map((g) => g.name).join(",")}
                </h1>
                <h1 className="font-semibold text-white">
                  Total length : {info.detail.runtime}min
                </h1>
              </div>
            </div>
            <h1 className="text-xl font-semibold italic text-white mb-2">
              {info.detail.tagline}
            </h1>
            <h1 className="text-white font-semibold text-xl mb-2">
              Overview :
            </h1>
            <p className="text-white mb-8">{
              window.innerWidth <= 640 ?
            info.detail.overview.slice(0,550):
            info.detail.overview
            }</p>
            <Link
              className="py-4 px-5  font-semibold rounded-md text-sm text-white bg-[#6556CD]"
              to={`${pathname}/trailer`}
            >
              <i className="text-md mr-3 ri-play-fill"></i>Play Trailer
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl text-white font-bold ml-7 mb-5">Seasons</h1>
        <div
          style={{
            willChange: "transform",
          }}
          className="h-[47vh] w-full mb-10 flex gap-5 overflow-x-auto overflow-y-hidden p-5"
        >
          {info.detail.seasons.length > 0 ? (
            info.detail.seasons.map((s, i) => (
              <div key={i} className="w-[55vw] h-[40vh] shrink-0 lg:w-[12vw]">
                <div className="w-full h-[90%]">
                  <img
                    className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                    loading="lazy"
                    src={
                      s?.poster_path
                        ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                        : noimage
                    }
                    alt=""
                  />
                </div>
                <div className="w-full h-[10%] pt-3">
                  <h1 className="text-white text-md font-semibold text-center">
                    {s.name}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-white font-black text-3xl text-center">
              Nothing to show
            </h1>
          )}
        </div>
      </div>
      <hr className="border-2 border-zinc-400" />
      <div className=" w-full h-[70vh] mt-10 relative">
        <h1 className="text-3xl text-white font-bold ml-7 mb-5">
          Recommendations
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default TvDetails;
