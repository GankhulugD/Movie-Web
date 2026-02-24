const BASE_URL = "https://api.themoviedb.org/3";

// 1. Интерфэйсүүд (Бүх файлд ижил байхаар нэгтгэв)
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
  release_date: string;
  runtime?: number;
  genres?: Genre[];
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface VideoResult {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
}

export interface SimilarResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// 2. Options тохиргоо
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
  next: { revalidate: 3600 },
};

// 3. Туслах fetch функц
async function fetchFromTMDB(path: string, params: string = "") {
  const url = `${BASE_URL}${path}?language=en-US${params}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status} at ${path}`);
  }
  return res.json();
}

// --- Экспортлох функцүүд ---

// Ангиллаар авах (Upcoming, Popular, Top Rated)
export const getMoviesByCategory = (
  category: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  const paths: Record<string, string> = {
    upcoming: "/movie/upcoming",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
  };
  return fetchFromTMDB(paths[category] || "/movie/popular", `&page=${page}`);
};

// Home page-д хэрэгтэй бүх датаг зэрэг авах
export const getHomePageData = () => {
  return Promise.all([
    getMoviesByCategory("top_rated", 1),
    getMoviesByCategory("popular", 1),
    getMoviesByCategory("upcoming", 1),
    fetchFromTMDB("/movie/now_playing", "&page=1"),
  ]);
};

// Киноны дэлгэрэнгүй
export const getMovieDetail = async (id: string): Promise<Movie> => {
  return fetchFromTMDB(`/movie/${id}`);
};

// Жүжигчдийн мэдээлэл
export const getMovieCredits = async (id: string): Promise<MovieCredits> => {
  return fetchFromTMDB(`/movie/${id}/credits`);
};

// Киноны видео (Trailer)
export const getMovieVideos = async (
  id: number,
): Promise<{ results: VideoResult[] }> => {
  return fetchFromTMDB(`/movie/${id}/videos`);
};

// Төстэй кинонууд
export const getSimilarMovies = async (
  id: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  return fetchFromTMDB(`/movie/${id}/similar`, `&page=${page}`);
};

// Хайлт
export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  if (!query) return { results: [], total_pages: 0, total_results: 0, page: 1 };
  return fetchFromTMDB(
    "/search/movie",
    `&query=${encodeURIComponent(query)}&page=${page}`,
  );
};

// Бүх жанрын жагсаалт
export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  return fetchFromTMDB("/genre/movie/list");
};

// Discover (Жанраар шүүх)
export const getDiscoverMovies = async (
  genreIds: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  return fetchFromTMDB(
    "/discover/movie",
    `&with_genres=${genreIds}&page=${page}`,
  );
};
