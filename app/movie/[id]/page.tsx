import {
  getMovieDetail,
  getMovieVideos,
  getSimilarMovies,
  getMovieCredits,
} from "@/app/utils/get-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, Play } from "lucide-react";
import { MovieSectionSimilar } from "@/components/MovieSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// --- 1. ТӨРӨЛЖҮҮЛЭЛТ (INTERFACES) ---
// Эдгээрийг заавал файлын дээд хэсэгт байлгах ёстой

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieDetail extends Movie {
  overview: string;
  runtime: number;
  genres: Genre[];
}

interface VideoResult {
  key: string;
  site: string;
  type: string;
}

interface APIResponse<T> {
  results: T[];
}

interface SimilarResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

interface CastMember {
  id: number;
  name: string;
  known_for_department: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

// --- 2. ҮНДСЭН ХУУДАС ---

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Дата авах хэсэгт төрөлжилтийг оноож өгсөн
  const [movie, videos, similar, credits]: [
    MovieDetail,
    APIResponse<VideoResult>,
    SimilarResponse,
    MovieCredits,
  ] = await Promise.all([
    getMovieDetail(id),
    getMovieVideos(Number(id)),
    getSimilarMovies(id),
    getMovieCredits(id),
  ]);

  // Шүүлтүүрүүд
  const director = credits.crew.find(
    (member: CrewMember) => member.job === "Director",
  );

  const writers = credits.crew
    .filter((member: CrewMember) =>
      ["Writer", "Screenplay", "Story"].includes(member.job),
    )
    .slice(0, 3);

  const stars = credits.cast
    .filter((member: CastMember) => member.known_for_department === "Acting")
    .slice(0, 3);

  const trailer = videos.results?.find(
    (v: VideoResult) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#09090B] text-black dark:text-white pb-20">
      {/* 1. Backdrop Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh]">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#09090B] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative -mt-32 md:-mt-48 z-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster - Next.js Image ашиглаж ESLint алдааг зассан */}
          <div className="w-[240px] md:w-[350px] flex-shrink-0 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6 flex-1">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
              <div className="flex items-center gap-4 text-sm md:text-lg opacity-80">
                <span className="flex items-center gap-1 font-bold text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  {movie.vote_average.toFixed(1)}/10
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  {movie.runtime} min
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  {movie.release_date}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre: Genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Overview</h3>
              <p className="text-lg leading-relaxed opacity-90">
                {movie.overview}
              </p>
            </div>

            {trailer && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors w-fit shadow-lg">
                    <Play className="fill-current w-5 h-5" /> Watch Trailer
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl p-0 bg-black border-none overflow-hidden aspect-video">
                  <DialogHeader className="sr-only">
                    <DialogTitle>{movie.title} Trailer</DialogTitle>
                  </DialogHeader>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title="YouTube video player"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Credits Section */}
        <div className="border-y border-gray-200 dark:border-gray-800 py-6 space-y-4 mt-10">
          {director && (
            <div className="flex gap-4">
              <span className="font-bold w-20 shrink-0 text-gray-500">
                Director
              </span>
              <span className="text-white-500 font-medium">
                {director.name}
              </span>
            </div>
          )}

          {writers.length > 0 && (
            <div className="flex gap-4 border-t border-gray-100 dark:border-gray-900 pt-3">
              <span className="font-bold w-20 shrink-0 text-gray-500">
                Writers
              </span>
              <div className="flex flex-wrap gap-x-2 text-white-500 font-medium">
                {writers.map((w: CrewMember, idx: number) => (
                  <span key={w.id}>
                    {w.name}
                    {idx < writers.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {stars.length > 0 && (
            <div className="flex gap-4 border-t border-gray-100 dark:border-gray-900 pt-3">
              <span className="font-bold w-20 shrink-0 text-gray-500">
                Stars
              </span>
              <div className="flex flex-wrap gap-x-2 text-white-500 font-medium">
                {stars.map((s: CastMember, idx: number) => (
                  <span key={s.id}>
                    {s.name}
                    {idx < stars.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-20">
          <MovieSectionSimilar
            title="Similar Movies"
            movies={similar.results}
            movieId={id}
          />
        </div>
      </div>
    </main>
  );
}
