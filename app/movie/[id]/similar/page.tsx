import { getSimilarMovies, getMovieDetail } from "@/app/utils/get-data";
import { MovieSectionFull } from "@/components/MovieSection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Интерфэйсүүд
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieDetail extends Movie {
  overview: string;
}

interface SimilarResponse {
  results: Movie[];
  total_pages: number;
}

export default async function SimilarMoviesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const id = resolvedParams.id;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Төрөлжүүлсэн өгөгдөл таталт
  const [movie, data]: [MovieDetail, SimilarResponse] = await Promise.all([
    getMovieDetail(id),
    getSimilarMovies(id, currentPage),
  ]);

  const totalPages = Math.min(data.total_pages, 500);

  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white min-h-screen pt-10">
      <div className="flex flex-col gap-8 pb-10">
        <MovieSectionFull
          title={`Movies Similar to "${movie.title}"`}
          movies={data.results}
          categoryPath=""
        />

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/movie/${id}/similar?page=${Math.max(1, currentPage - 1)}`}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href={`/movie/${id}/similar?page=${Math.min(totalPages, currentPage + 1)}`}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
