import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Trending from "./components/left/trending";
import Popular from "./components/left/Popular";
import Movie from "./components/left/Movie";
import Tvshows from "./components/left/Tvshows";
import People from "./components/left/People";
import Moviedetails from "./components/left/Moviedetails";
import TvDetails from "./components/left/TvDetails";
import PersonDetails from "./components/left/PersonDetails";
import Trailer from "./components/left/Trailer";
import NotFound from "./components/left/NotFound";
const App = () => {
  return (
    <div className="bg-[#1f1e24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
