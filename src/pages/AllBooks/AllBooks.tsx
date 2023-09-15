import BookCard from "../../components/BookCard";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import { IBook } from "../../types/book";
import Subscribe from "../../components/Subscribe";
import { useState } from "react";
import { errorToast } from "../../hooks/useToast";
import { padNumberToFourDigits } from "../../lib/utils";

export default function AllBooks() {
  const [filter, setFilter] = useState("title");
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useGetBooksQuery(
    `${query}&sort=-createdAt`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // filtering start
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterQuery = (e: any) => {
    // set the input value
    const searchInput = e.target.value.trim();

    if (searchInput.length > 0) {
      if (filter !== "publicationYear") {
        const query = `search=${searchInput}&searchFields=${filter}`;
        setQuery(query);
      } else {
        const numericSearchInput = parseInt(searchInput);

        if (!isNaN(numericSearchInput)) {
          // pad the number to four digits if less than 4
          const year = padNumberToFourDigits(numericSearchInput);
          const query = `publicationDate[gte]=${year}&publicationDate[lt]=${padNumberToFourDigits(
            parseInt(year) + 1
          )}`;
          setQuery(query);
        } else {
          errorToast("Please input a valid year");
        }
      }
    } else {
      setQuery("");
    }
  };
  // end of filtering

  if (error) {
    return <div>Error:</div>;
  }

  return (
    <div>
      <div className="container my-10">
        <div className="relative flex rounded-md border shadow-sm max-w-3xl m-auto">
          <input
            type="text"
            id="hs-trailing-button-add-on-multiple-add-ons"
            name="hs-trailing-button-add-on-multiple-add-ons"
            className="py-4 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-l-md text-sm  focus:border-blue-500 focus:z-10 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            onChange={(e) => filterQuery(e)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <div className="min-w-fit border">
            <select
              className="block w-full h-full py-4 px-4 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="genre">Genre</option>
              <option value="publicationYear">Publication year</option>
            </select>
          </div>
          {/* <button
            type="button"
            className="py-4 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            onClick={filterQuery}
          >
            Search
          </button> */}
        </div>
      </div>
      <section className="pb-32 pt-5">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">
              All Books
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Get all the Book here.
            </p>
          </div>
          {isLoading && (
            <div className="min-h-[15rem] flex flex-col rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <div className="flex justify-center">
                  <div
                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isLoading && (
            <>
              <div className="grid gap-8 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:px-10 px-4">
                {data.data.length > 0 ? (
                  data.data.map((book: IBook) => (
                    <BookCard book={book} key={book._id} />
                  ))
                ) : (
                  <h2 className="text-center col-span-full text-red-500 font-semibold text-xl">
                    No Data found
                  </h2>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <div className="mb-6">
        <Subscribe />
      </div>
    </div>
  );
}
