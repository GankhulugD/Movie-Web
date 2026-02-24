import { MovieSectionFull } from "@/components/MovieSection";
import { getMoviesByCategory } from "@/app/utils/get-data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function PopularPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;

  const data = await getMoviesByCategory("top_rated", currentPage);
  const totalPages = Math.min(data.total_pages, 500); // TMDB хязгаар

  // Харагдах хуудасны дугааруудыг тооцоолох (Одоогийн хуудасны өмнөх 2, дараах 2)
  const pages = Array.from({ length: 5 }, (_, i) => currentPage - 2 + i).filter(
    (page) => page > 0 && page <= totalPages,
  );

  return (
    <div className="bg-white dark:bg-[#09090B] text-black dark:text-white min-h-screen pt-10">
      <div className="flex flex-col gap-8 pb-10">
        <MovieSectionFull
          title="Top Rated Movies"
          movies={data.results}
          categoryPath="top_rated"
        />

        <Pagination className="mt-8">
          <PaginationContent>
            {/* Өмнөх хуудас */}
            <PaginationItem>
              <PaginationPrevious
                href={`/category/top_rated?page=${Math.max(1, currentPage - 1)}`}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Эхний хуудас руу очих (Хэрэв хол байгаа бол) */}
            {pages[0] > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink href="/category/top_rated?page=1">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {/* Дунд хэсгийн дугаарууд */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`/category/top_rated?page=${page}`}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Сүүлийн хуудас руу очих (Хэрэв хол байгаа бол) */}
            {pages[pages.length - 1] < totalPages && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`/category/top_rated?page=${totalPages}`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Дараагийн хуудас */}
            <PaginationItem>
              <PaginationNext
                href={`/category/top_rated?page=${Math.min(totalPages, currentPage + 1)}`}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Нийт хуудасны мэдээллийг текстээр харуулах */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
