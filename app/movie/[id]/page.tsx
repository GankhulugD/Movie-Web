import Image from "next/image";
import Link from "next/link";
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
import { Star, Clock, Calendar, ChevronRight } from "lucide-react";
import { MovieSectionFull } from "@/components/MovieSection";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [movie, videoData, similarData, credits]: [
    Movie,
    { results: VideoResult[] },
    SimilarResponse,
    MovieCredits,
  ] = await Promise.all([
    getMovieDetail(id),
    getMovieVideos(Number(id)),
    getSimilarMovies(id, 1),
    getMovieCredits(id),
  ]);

  const director = credits.crew?.find((p) => p.job === "Director");
  const writers = credits.crew
    ?.filter((p) => ["Writer", "Screenplay"].includes(p.job))
    .slice(0, 3);
  const stars = credits.cast?.slice(0, 3);
  const trailer = videoData.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-white dark:bg-[#09090B]">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[600px] w-full">
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/no-image.png"
          }
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-4 md:px-10 flex flex-col md:flex-row gap-6 items-start md:items-end text-white">
          <div className="relative w-32 md:w-64 aspect-[2/3] shrink-0 shadow-2xl rounded-lg overflow-hidden border border-white/10 hidden sm:block">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-6xl font-bold mb-2 leading-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center text-xs md:text-sm font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {movie.release_date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {movie.runtime}m
              </span>
              <span className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />{" "}
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Storyline + Credits */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Storyline</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
              {movie.overview}
            </p>
          </section>

          <section className="border-y border-gray-100 dark:border-gray-800 py-6 space-y-4">
            <div className="flex gap-4">
              <span className="font-bold w-20 shrink-0">Director</span>
              <span className="underline decoration-gray-400">
                {director?.name || "N/A"}
              </span>
            </div>
            <div className="flex gap-4 pt-4 border-t border-gray-50 dark:border-zinc-900">
              <span className="font-bold w-20 shrink-0">Writers</span>
              <span className="underline decoration-gray-400">
                {writers?.map((w) => w.name).join(", ")}
              </span>
            </div>
            <div className="flex gap-4 pt-4 border-t border-gray-50 dark:border-zinc-900">
              <span className="font-bold w-20 shrink-0">Stars</span>
              <span className="underline decoration-gray-400">
                {stars?.map((s) => s.name).join(", ")}
              </span>
            </div>
          </section>
        </div>

        {/* Right: Genres or extra info — empty col placeholder */}
        <div />
      </div>

      {/* Trailer — full width */}
      {trailer && (
        <div className="max-w-7xl mx-auto w-full px-4 pb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Trailer</h2>
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
              className="border-none"
            />
          </div>
        </div>
      )}

      {/* Similar Movies */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center px-4 mb-2">
          <h2 className="text-xl md:text-2xl font-bold">More like this</h2>
          <Link
            href={`/movie/${id}/similar`}
            className="flex items-center gap-1 text-sm font-semibold hover:opacity-70 transition-opacity"
          >
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <MovieSectionFull
          title=""
          movies={similarData.results.slice(0, 10)}
          categoryPath=""
        />
      </div>
    </div>
  );
}
