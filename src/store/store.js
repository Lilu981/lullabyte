import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slices/songsSlice";
import artistsReducer from "./slices/artistsSlice";
import authReducer from "./slices/authSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    artists: artistsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});
