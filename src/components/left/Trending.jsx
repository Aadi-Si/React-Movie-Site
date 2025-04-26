import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import VerticalCards from "./VerticalCards";
import axios from "../../utilis/axios";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  document.title = "addi | Trending " + category;
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      settrending((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    settrending([]);
    setpage(1);
    GetTrending();
  }, [category, duration]);
  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <TopNav />
      <div className="w-full flex items-center pl-5 pr-5 ">
        <h1 className="text-3xl font-black text-zinc-400 mt-3">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl ri-arrow-left-line font-semibold text-zinc-400 hover:text-[#6556cd] mr-5"
          ></i>
          Trending
        </h1>
      </div>
      <div className="pl-10 w-[90%] flex items-center justify-end mt-5 lg:w-[30%] lg:pl-15">
        <Dropdown
          title="Category"
          options={["Tv", "Movie", "All"]}
          func={(e) => setcategory(e.target.value.toLowerCase())}
          className="w-150px"
        />
        <div className="w-[5%]"></div>
        <Dropdown
          title="Duration"
          options={["Week", "Day"]}
          func={(e) => setduration(e.target.value.toLowerCase())}
          className="w-150px"
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
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
        <VerticalCards data={trending} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
