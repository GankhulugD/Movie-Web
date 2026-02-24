import Image from "next/image";
import {
  getMovieDetail,
  getMovieVideos,
  getSimilarMovies,
  getMovieCredits,
  Movie,
  SimilarResponse,
  VideoResult,
  MovieCredits,
} from "@/app/utils/get-data";
import { Star, Clock, Calendar } from "lucide-react";
import { MovieSectionFull } from "@/components/MovieSection";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Төрлүүдийг хатуу зааж өгснөөр "Type is not assignable" алдааг засна
  const [movie, videoData, similarData, credits]: [
    Movie,
    { results: VideoResult[] },
    SimilarResponse,
    MovieCredits,
  ] = await Promise.all([
    getMovieDetail(id),
    getMovieVideos(Number(id)),
    getSimilarMovies(id),
    getMovieCredits(id),
  ]);

  const trailer = videoData.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] w-full">
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 container mx-auto px-5 flex flex-col md:flex-row gap-8 items-end">
          <div className="relative w-40 md:w-64 aspect-[2/3] shrink-0 shadow-2xl rounded-lg overflow-hidden hidden md:block border border-gray-800">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-image.png"
              }
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center opacity-90 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {movie.release_date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {movie.runtime}m
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {movie.vote_average.toFixed(1)}{" "}
                <span className="text-xs opacity-60">({movie.vote_count})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Story & Cast */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Storyline</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
              {movie.overview}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {credits.cast?.slice(0, 10).map((person) => (
                <div key={person.id} className="min-w-[120px] text-center">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 border-2 border-gray-200 dark:border-gray-800 shadow-md">
                    <Image
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : "/no-avatar.png"
                      }
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold line-clamp-1">
                    {person.name}
                  </p>
                  <p className="text-xs opacity-50 line-clamp-1 italic">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Trailer & Info */}
        <div className="space-y-8">
          {trailer && (
            <section>
              <h2 className="text-xl font-bold mb-4">Official Trailer</h2>
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-none"
                ></iframe>
              </div>
            </section>
          )}

          <section className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-full text-xs font-semibold"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="container mx-auto px-5">
        <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-10" />
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <MovieSectionFull
          title=""
          movies={similarData.results}
          categoryPath=""
        />
      </div>
    </div>
  );
}
