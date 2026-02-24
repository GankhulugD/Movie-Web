import { Hero } from "../components/Hero";
import { MovieSection } from "../components/MovieSection";
import { getHomePageData, getMovieVideos } from "@/app/utils/get-data";

// --- TypeScript Interfaces ---
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
}

interface VideoResult {
  key: string;
  site: string;
  type: string;
}

interface VideoResponse {
  results: VideoResult[];
}

interface HeroMovie extends Movie {
  trailerKey: string | null;
}

export default async function HomePage() {
  const [topData, popularData, upcomingData, nowPlayingData] =
    await getHomePageData();

  const rawHeroMovies: Movie[] = nowPlayingData.results?.slice(0, 3) || [];

  // Сервер талд трейлерүүдийг татах (Any-гүй хувилбар)
  const heroMovies: HeroMovie[] = await Promise.all(
    rawHeroMovies.map(async (movie: Movie): Promise<HeroMovie> => {
      try {
        const videoData: VideoResponse = await getMovieVideos(movie.id);

        // Трейлер эсвэл Теaser хайх логик
        const trailer =
          videoData.results?.find(
            (v: VideoResult) => v.type === "Trailer" && v.site === "YouTube",
          ) ||
          videoData.results?.find((v: VideoResult) => v.site === "YouTube");

        return {
          ...movie,
          trailerKey: trailer?.key || null,
        };
      } catch (error) {
        console.error(`Error fetching video for movie ${movie.id}:`, error);
        return { ...movie, trailerKey: null };
      }
    }),
  );

  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white min-h-screen">
      {/* Төрөлжүүлсэн массив дамжуулна */}
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}

      <div className="flex flex-col gap-8 pb-10 mt-10">
        <MovieSection
          title="Upcoming"
          movies={upcomingData.results}
          categoryPath="upcoming"
        />
        <MovieSection
          title="Popular"
          movies={popularData.results}
          categoryPath="popular"
        />
        <MovieSection
          title="Top Rated"
          movies={topData.results}
          categoryPath="top_rated"
        />
      </div>
    </div>
  );
}
