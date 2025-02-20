import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export interface MovieDetailsProps {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    language: string;
    imdbRating: string;
    imdbVotes: string;
}

interface Movies {
    id: string;
    title: string;
    year: string;
    poster: string
}

interface MovieState {
    movieList: Movies[];
    movieDetails: MovieDetailsProps | null;
    isLoaded: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movieList: [],
    movieDetails: null,
    isLoaded: false,
    error: null,
};

export const getMovieList = createAsyncThunk(
    "movies/getMovieList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=all`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                maxRedirects: 5  // Allow redirects
            });

            return response.data;

        } catch (error) {
            console.error('Error details:', error);
            return rejectWithValue(error.message || "Network error");
        }
    }
);

export const getMovieDetails = createAsyncThunk(
    "movies/getMovieDetails",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                maxRedirects: 5  // Allow redirects
            });
            return response.data;

        } catch (error) {
            console.error('Error details:', error);
            return rejectWithValue(error.message || "Network error");
        }
    }
);
export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovieList.pending, (state) => {
            state.isLoaded = false;
            state.error = null;
        })
        builder.addCase(getMovieList.fulfilled, (state, action: PayloadAction<{ Response: string, Search: any[], totalResults: number }>) => {
            const data = action.payload.Search.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }))
            state.movieList = data;
            state.isLoaded = true;
            state.error = null;
        })
        builder.addCase(getMovieList.rejected, (state, action) => {
            state.isLoaded = false;
            state.error = action.payload as string;
        })
        builder.addCase(getMovieDetails.pending, (state) => {
            state.isLoaded = false;
            state.error = null;
        })
        builder.addCase(getMovieDetails.fulfilled, (state, action: PayloadAction<any>) => {
            const data = {
                title: action.payload.Title,
                year: action.payload.Year,
                imdbID: action.payload.imdbID,
                type: action.payload.Type,
                poster: action.payload.Poster,
                released: action.payload.Released,
                runtime: action.payload.Runtime,
                genre: action.payload.Genre,
                director: action.payload.Director,
                language: action.payload.Language,
                imdbRating: action.payload.imdbRating,
                imdbVotes: action.payload.imdbVotes,
            }
            state.movieDetails = data;
            state.isLoaded = true;
            state.error = null;
        })
        builder.addCase(getMovieDetails.rejected, (state, action) => {
            state.isLoaded = false;
            state.error = action.payload as string;
        })
    }
})

export default movieSlice.reducer;
