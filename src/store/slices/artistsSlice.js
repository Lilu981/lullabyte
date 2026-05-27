import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3001";

export const fetchArtists = createAsyncThunk("artists/fetchAll", async () => {
  const res = await fetch(`${API}/artists`);
  return res.json();
});

export const fetchArtistById = createAsyncThunk("artists/fetchById", async (id) => {
  const res = await fetch(`${API}/artists/${id}`);
  return res.json();
});

export const addArtist = createAsyncThunk("artists/add", async (artist) => {
  const res = await fetch(`${API}/artists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artist),
  });
  return res.json();
});

export const updateArtist = createAsyncThunk("artists/update", async (artist) => {
  const res = await fetch(`${API}/artists/${artist.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(artist),
  });
  return res.json();
});

export const deleteArtist = createAsyncThunk("artists/delete", async (id) => {
  await fetch(`${API}/artists/${id}`, { method: "DELETE" });
  return id;
});

const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    items: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(addArtist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        const index = state.items.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export default artistsSlice.reducer;
