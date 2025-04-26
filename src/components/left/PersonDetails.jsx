import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  asyncloadperson,
  removeperson,
} from "../../store/actions/personActions";
import Loader from "./Loader";
import HorizontalCards from "./HorizontalCards";
import noimage from "/noimage.jpg";
const PersonDetails = () => {
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="relative w-screen h-screen overflow-y-auto px-[10%]">
      <nav className="h-[10vh] w-full text-white flex items-center gap-10 text-xl px-6">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xl ri-arrow-left-line font-semibold text-zinc-400 hover:text-[#6556cd] mr-5"
        ></Link>
      </nav>
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <div
          style={{ borderRadius: "10px" }}
          className=" w-full h-[90vh] px-9 text-white text-2xl border-r-4 border-r-[#1f1e24] lg:w-[25%] lg:border-r-zinc-400"
        >
          <img
            className="h-[45vh] object-cover rounded-xl mb-5"
            loading="lazy"
            src={
              info.detail?.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : noimage
            }
            alt=""
          />
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="mr-10"
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            className="mr-10"
          >
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            className="mr-10"
          >
            <i className="ri-instagram-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            className="mr-10"
          >
            <i className="ri-twitter-x-line"></i>
          </a>
          <h1 className="text-2xl font-bold mt-5">Personal Info</h1>
          <h1 className="text-lg font-semibold mt-4">
            Known For :
            <span className="text-sm font-semibold ml-11">
              {info.detail.known_for_department || "N.A"}
            </span>
          </h1>

          <h1 className="text-lg font-semibold mt-1">
            Gender :
            <span className="text-sm font-semibold ml-18">
              {info.detail.gender === 2
                ? "Male"
                : info.detail.gender === 1
                ? "Female"
                : "N.A"}
            </span>
          </h1>

          <h1 className="text-lg font-semibold mt-1">
            Birthday :
            <span className="text-sm font-semibold ml-15.5">
              {info.detail.birthday || "N.A"}
            </span>
          </h1>

          <h1 className="text-lg font-semibold mt-1">
            Deathday :
            <span className="text-sm font-semibold ml-13.5">
              {info.detail.deathday || "Still Alive"}
            </span>
          </h1>

          <h1 className="text-lg font-semibold mt-1">
            Place Of Birth :
            <span className="text-sm font-semibold ml-5">
              {info.detail.place_of_birth || "N.A"}
            </span>
          </h1>
        </div>
        <div className=" w-full h-[90vh] lg:w-[75%]">
          <div className="content mb-15">
            <h1 className="text-white text-5xl font-black mb-10">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}
            </h1>
            <div className="flex text-white items-center gap-x-3 mt-3 mb-2.5">
              <div className="w-full">
                <div className="relative mb-1 py-3">
                  <h1 className="font-bold text-2xl leading-6 mb-5">
                    Popularity
                    <span className=" text-white  bg-yellow-600 rounded-full w-[9vh] h-[9vh] flex items-center justify-center font-bold text-md mt-3">
                      {info.detail.popularity.toFixed() * 10}
                      <sup>%</sup>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            <h1 className="text-white font-bold text-2xl mb-5">Biography :</h1>
            <p className="text-white mt-5 mb-8">
              {window.innerWidth <= 640 ?
              info.detail.biography.slice(0, 750):
              info.detail.biography.slice(0, 1600)
              }...
              <Link to={"*"} className="text-blue-300">
                more
              </Link>
            </p>
          </div>
        </div>
      </div>
      <hr className="border-2 border-zinc-400 ml-8 mt-7" />
      <div className="flex justify-between items-center p-8 pb-2">
        <h1 className="text-3xl text-white font-bold  mb-5">Worked In</h1>
      </div>
      <div className="mb-10">
        <HorizontalCards data={info.combinedCredits.cast} />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
