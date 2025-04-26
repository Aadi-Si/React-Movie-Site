import React, { useEffect, useState } from "react";
import TopNav from "./left/TopNav";
import axios from "../utilis/axios";
import Header from "./left/Header";
import HorizontalCards from "./left/HorizontalCards";
import Dropdown from "./left/Dropdown";
import Loader from "./left/Loader";

const Home = () => {
  document.title = "addi | Homepage";

  const [wallpaper, setwallpaper] = useState([]);
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomSet = data.results.sort().slice(0, 5);
      setwallpaper(randomSet);
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    if (wallpaper.length === 0) {
      GetHeaderWallpaper();
    }
    GetTrending();
  }, [category]);

  return trending.length > 0 && category.length > 0 ? (
    <>
      <div className="w-full h-screen overflow-auto">
        <TopNav />
        <Header data={wallpaper} />
        <div className="flex gap-20 items-center p-5 pb-2 w-full lg:p-8 lg:justify-between lg:gap-0">
          <h1 className="text-2xl text-zinc-400 font-black lg:text-3xl">Trending</h1>
            <Dropdown
              title="Filter"
              options={["Tv", "Movie", "All"]}
              func={(e) => setcategory(e.target.value.toLowerCase())}
            />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
