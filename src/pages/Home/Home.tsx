import Hero from "../../components/Hero";
import Subscribe from "../../components/Subscribe";
import BookCard from "../../components/BookCard";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import { IBook } from "../../types/book";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading, error } = useGetBooksQuery(
    "sort=-createdAt&limit=10",
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (error) {
    return <div>Error:</div>;
  }

  return (
    <>
      <Hero />
      <section className="pb-32 pt-5">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">
              Our Letest Book
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Get all the latest Book here.
            </p>
          </div>
          {!isLoading && (
            <>
              <div className="grid gap-8 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:px-10 px-4">
                {data.data &&
                  data.data.map((book: IBook) => (
                    <BookCard book={book} key={book._id} />
                  ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                  to="/all-books"
                >
                  Get All Books
                  <svg
                    className="w-2.5 h-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      <div className="mb-6">
        <Subscribe />
      </div>
    </>
  );
}
