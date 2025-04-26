import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import VerticalCards from "./VerticalCards";
import axios from "../../utilis/axios";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const Movie = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  document.title = "addi | Movie " + category;
  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      setmovie((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setmovie([]);
    setpage(1);
    GetMovie();
  }, [category]);
  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <TopNav />
      <div className="w-full flex items-center pl-5 pr-5 ">
        <h1 className="text-3xl font-black text-zinc-400 mt-3">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl ri-arrow-left-line font-semibold text-zinc-400 hover:text-[#6556cd] mr-5"
          ></i>
          Movies
        </h1>
      </div>
      <div className="pl-15 w-[55%] flex items-center justify-end mt-5 lg:w-[18%]">
        <Dropdown
          title="Category"
          options={["Upcoming", "Popular", "Top_Rated", "Now_Playing"]}
          func={(e) => setcategory(e.target.value.toLowerCase())}
        />
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={true}
        loader={
          <h4 className="text-3xl text-zinc-200 font-Semibold text-center bg-[#1f1e24]">
            Loading...
          </h4>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <VerticalCards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movie;
