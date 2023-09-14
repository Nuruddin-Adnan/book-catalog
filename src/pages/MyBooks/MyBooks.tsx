import { format } from "date-fns";
import { calculateRatings } from "../../lib/utils";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { errorToast } from "../../hooks/useToast";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../redux/features/books/bookApi";
import { useAppSelector } from "../../redux/hook";
import { AuthState } from "../../types/auth";

export default function MyBooks() {
  const { user } = useAppSelector((state: { auth: AuthState }) => state.auth);
  const [deleteBook] = useDeleteBookMutation();

  const { data, isLoading, error } = useGetBooksQuery(`author=${user?._id}`, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  const myBooks = data.data;

  const deleteBookHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteBook(id);
        if ("error" in response) {
          if (response.error && "data" in response.error) {
            const errorData = response.error.data as { message: string };
            errorToast(errorData.message);
          }
        } else {
          Swal.fire(response.data.message);
        }
      }
    });
  };

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold">My Books</h2>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Book
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Reviewer
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Publish Date
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Action
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {myBooks.length > 0 ? (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      myBooks.map((book: any) => (
                        <tr
                          key={book._id}
                          className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                        >
                          <td className="h-px w-px whitespace-nowrap">
                            <Link
                              className="block h-full p-6"
                              to={`/book-details/${book?._id}`}
                            >
                              <div className="flex items-center gap-x-4">
                                <img
                                  className="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-md"
                                  src={
                                    book?.imgURL !== ""
                                      ? book?.imgURL
                                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                  }
                                  alt="Image Description"
                                />
                                <div>
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {book?.title}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="h-px w-72 min-w-[18rem]">
                            <div className="h-full p-6">
                              <div className="star-rating flex items-center">
                                <Rating
                                  initialValue={
                                    calculateRatings(book?.reviews) as number
                                  }
                                  readonly
                                  size={20}
                                />
                                <div className="pt-1 pl-2">
                                  {calculateRatings(book?.reviews)} out of 5
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="block h-full p-6">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {format(
                                  new Date(book?.publicationDate),
                                  "dd MMM yyyy"
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="h-full p-6">
                              <button
                                type="button"
                                className="py-2 px-4 mr-1 inline-flex justify-center items-center gap-2 rounded-md bg-red-100 border border-transparent font-semibold text-red-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                onClick={() => deleteBookHandler(book._id)}
                              >
                                Delete
                              </button>
                              <Link
                                to={`/edit-book/${book._id}`}
                                className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-purple-100 border border-transparent font-semibold text-purple-500 hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={50}
                          className="text-center text-red-500 text-2xl py-5"
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
