import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3001";

export const fetchFavorites = createAsyncThunk("favorites/fetchAll", async (userId) => {
  const res = await fetch(`${API}/favorites?userId=${userId}`);
  return res.json();
});

export const addFavorite = createAsyncThunk("favorites/add", async ({ userId, songId }) => {
  const res = await fetch(`${API}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, songId }),
  });
  return res.json();
});

export const removeFavorite = createAsyncThunk("favorites/remove", async (id) => {
  await fetch(`${API}/favorites/${id}`, { method: "DELETE" });
  return id;
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((f) => f.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
