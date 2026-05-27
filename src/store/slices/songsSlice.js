import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3001";

export const fetchSongs = createAsyncThunk("songs/fetchAll", async (params = "") => {
  const res = await fetch(`${API}/songs${params}`);
  return res.json();
});

export const fetchSongById = createAsyncThunk("songs/fetchById", async (id) => {
  const res = await fetch(`${API}/songs/${id}`);
  return res.json();
});

export const addSong = createAsyncThunk("songs/add", async (song) => {
  const res = await fetch(`${API}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  return res.json();
});

export const updateSong = createAsyncThunk("songs/update", async (song) => {
  const res = await fetch(`${API}/songs/${song.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  return res.json();
});

export const deleteSong = createAsyncThunk("songs/delete", async (id) => {
  await fetch(`${API}/songs/${id}`, { method: "DELETE" });
  return id;
});

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    items: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSongs.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSongById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
      });
  },
});

export default songsSlice.reducer;
