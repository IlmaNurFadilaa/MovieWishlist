import axios from "axios";

const API_KEY = "0b1a7ebd2496160c05d159f493d3094e";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const getTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    return [];
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await api.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query: query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// FUNGSI BARU: Mengambil detail lengkap satu film
export const getMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// FUNGSI BARU: Mengambil data pemeran (cast)
export const getMovieCredits = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
};