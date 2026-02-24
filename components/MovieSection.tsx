import Link from "next/link";
import { Card } from "./Card";

// Үндсэн киноны өгөгдлийн төрөл
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// 1. Үндсэн нүүр хуудсанд ашиглагдах хэсэг (Эхний 10 кино)
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
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {title}
        </h2>
        <Link
          href={`/category/${categoryPath}`}
          className="text-black hover:underline dark:text-white"
        >
          See more →
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
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

// 2. Ангилал болон ижил төстэй киноны "See more" хуудсанд зориулсан хэсэг (Бүх кино)
export const MovieSectionFull = ({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
  categoryPath: string;
}) => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {title}
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
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

// 3. Киноны дэлгэрэнгүй хуудсанд зориулсан ижил төстэй киноны хэсэг
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
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {title}
        </h2>
        <Link
          href={`/movie/${movieId}/similar`}
          className="text-black hover:underline dark:text-white font-semibold"
        >
          See more →
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
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
