import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/personSlice";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});
