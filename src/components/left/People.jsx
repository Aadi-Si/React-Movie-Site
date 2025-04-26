import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import VerticalCards from "./VerticalCards";
import axios from "../../utilis/axios";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  document.title = "addi | " + category + " People";
  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      setpeople((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setpeople([]);
    setpage(1);
    GetPeople();
  }, [category]);
  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <TopNav />
      <div className="w-full flex items-center pl-5 pr-5 ">
        <h1 className="text-3xl font-black text-zinc-400 mt-3">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl ri-arrow-left-line font-semibold text-zinc-400 hover:text-[#6556cd] mr-5"
          ></i>
          People
        </h1>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
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
        <VerticalCards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default People;
