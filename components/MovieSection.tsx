import Link from "next/link";
import { Card } from "./Card";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// 1. Home Page Section (Эхний 10 кино)
export const MovieSection = ({
  title,
  movies,
  categoryPath,
}: {
  title: string;
  movies: Movie[];
  categoryPath: string;
}) => {
  return (
    <div className="px-4 py-6 max-w-7xl mx-auto w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white truncate pr-2">
          {title}
        </h2>
        <Link
          href={`/category/${categoryPath}`}
          className="text-sm font-semibold text-black hover:underline dark:text-white shrink-0"
        >
          See more →
        </Link>
      </div>
      {/* Grid: Mobile дээр 2 эгнээ, Tablet дээр 3, Desktop дээр 5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.slice(0, 10).map((movie: Movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            point={Math.floor(movie.vote_average * 10) / 10}
            name={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

// 2. Full Section (Similar See More хуудсанд зориулсан)
export const MovieSectionFull = ({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
  categoryPath: string;
}) => {
  return (
    <div className="px-4 py-6 max-w-7xl mx-auto w-full overflow-hidden">
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">
            {title}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie: Movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            point={Math.floor(movie.vote_average * 10) / 10}
            name={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

// 3. Similar Section (Detail хуудасны доорх 5 кино)
export const MovieSectionSimilar = ({
  title,
  movies,
  movieId,
}: {
  title: string;
  movies: Movie[];
  movieId: string;
}) => {
  return (
    <div className="px-4 py-6 max-w-7xl mx-auto w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">
          {title}
        </h2>
        <Link
          href={`/movie/${movieId}/similar`}
          className="text-sm font-semibold text-black hover:underline dark:text-white"
        >
          See more →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.slice(0, 5).map((movie: Movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            point={Math.floor(movie.vote_average * 10) / 10}
            name={movie.title}
          />
        ))}
      </div>
    </div>
  );
};
