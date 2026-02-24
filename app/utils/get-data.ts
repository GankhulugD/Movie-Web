const BASE_URL = "https://api.themoviedb.org/3";

// 1. Интерфэйсүүдээ export хийж дээд талд нь байрлуулна
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  overview?: string;
  release_date?: string;
  genre_ids?: number[]; // Энийг нэмсэн (Search хийсэн үед жанраар шүүхэд хэрэгтэй)
}

export interface SimilarResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface Genre {
  id: number;
  name: string;
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

// 3. Үндсэн fetch функц
async function fetchMovies(path: string, page: number = 1) {
  const res = await fetch(
    `${BASE_URL}${path}?language=en-US&page=${page}`,
    options,
  );
  if (!res.ok) throw new Error(`Failed to fetch: ${path}`);
  return res.json();
}

// --- Функцууд ---

export const getMoviesByCategory = (category: string, page: number = 1) => {
  const paths: Record<string, string> = {
    upcoming: "/movie/upcoming",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
  };
  return fetchMovies(paths[category] || "/movie/popular", page);
};

export const getHomePageData = () => {
  return Promise.all([
    fetchMovies("/movie/top_rated", 1),
    fetchMovies("/movie/popular", 1),
    fetchMovies("/movie/upcoming", 1),
    fetchMovies("/movie/now_playing", 1),
  ]);
};

export const getMovieDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, options);
  if (!res.ok) throw new Error("Failed to fetch movie detail");
  return res.json();
};

export const getMovieCredits = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?language=en-US`,
    options,
  );
  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json();
};

export const getMovieVideos = async (id: number) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/videos?language=en-US`,
    options,
  );
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

export const getSimilarMovies = async (
  id: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/similar?language=en-US&page=${page}`,
    options,
  );
  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return res.json();
};

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  if (!query) return { results: [], total_pages: 0, total_results: 0, page: 1 };

  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    options,
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};

export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?language=en-US`,
    options,
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
};

export const getDiscoverMovies = async (
  genreIds: string,
  page: number = 1,
): Promise<SimilarResponse> => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?language=en-US&with_genres=${genreIds}&page=${page}`,
    options,
  );
  if (!res.ok) throw new Error("Failed to fetch discover movies");
  return res.json();
};
