import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: false, // Initial loading state
  error: null,
};

// Async thunk to fetch movies
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=movie`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch shows
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    //cleanUp
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.loading = true;
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.loading = false;
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state, action) => {
        state.loading = false; // Set loading state to false when fetching movies fails
        state.error = action.payload;
      })
      .addCase(fetchAsyncShows.pending, (state) => {
        state.loading = true;
        console.log("Pending");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.loading = false;
        state.shows = payload;
      })
      .addCase(fetchAsyncShows.rejected, (state, action) => {
        state.loading = false; // Set loading state to false when fetching movies fails
        state.error = action.payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.pending, (state) => {
        state.loading = true;
        console.log("Pending");
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully!");
        state.loading = false;
        state.selectedMovieOrShow = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.rejected, (state, action) => {
        state.loading = false; // Set loading state to false when fetching movies fails
        state.error = action.payload;
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
