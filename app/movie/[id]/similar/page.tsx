import {
  getSimilarMovies,
  getMovieDetail,
  Movie,
  SimilarResponse,
} from "@/app/utils/get-data";
import { MovieSectionFull } from "@/components/MovieSection";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function SimilarMoviesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [movie, data]: [Movie, SimilarResponse] = await Promise.all([
    getMovieDetail(id),
    getSimilarMovies(id, currentPage),
  ]);

  const totalPages = Math.min(data.total_pages, 500);
  const createPageURL = (p: number | string) =>
    `/movie/${id}/similar?page=${p}`;

  return (
    <div className="min-h-screen py-10">
      <div className="px-4 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-2">More like {movie.title}</h1>
      </div>

      <MovieSectionFull title="" movies={data.results} categoryPath="" />

      <div className="px-4 max-w-7xl mx-auto w-full">
        <div className="mt-12 mb-20">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href={createPageURL(1)}
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 3 && <PaginationEllipsis />}

              {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                .filter((p) => p > 1 && p < totalPages)
                .map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href={createPageURL(p)}
                      isActive={currentPage === p}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {currentPage < totalPages - 2 && <PaginationEllipsis />}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={createPageURL(totalPages)}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href={
                    currentPage < totalPages
                      ? createPageURL(currentPage + 1)
                      : "#"
                  }
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
