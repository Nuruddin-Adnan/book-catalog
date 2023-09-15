import { format } from "date-fns";
import { calculateRatings } from "../../lib/utils";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { errorToast, successToast } from "../../hooks/useToast";
import {
  useDeleteMyReadinglistMutation,
  useGetMyReadinglistsQuery,
  useUpdateMyReadinglistMutation,
} from "../../redux/features/myReadingList/myReadingList";

export default function MyReadingList() {
  const [deleteMyReadinglist] = useDeleteMyReadinglistMutation();
  const [updateMyReadinglist] = useUpdateMyReadinglistMutation();
  const { data, isLoading, isError } = useGetMyReadinglistsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const myReadingLists = data.data;

  // update the status of my reading list
  const updateMyReadinglistHandler = async (id: string, status: string) => {
    const data = { status: status };

    const response = await updateMyReadinglist({ id, data });
    if ("error" in response) {
      if (response.error && "data" in response.error) {
        const errorData = response.error.data as { message: string };
        errorToast(errorData.message);
      }
    } else {
      successToast(response.data.message);
    }
  };
  // end of update of status of my reading list

  // delete from my reading list start
  const deleteMyReadinglistHandler = async (id: string) => {
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
        const response = await deleteMyReadinglist(id);
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
  // end of delete from my reading list

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold">My Reading List</h2>
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
                            Status
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
                    {myReadingLists.length > 0 ? (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      myReadingLists.map((myReadingList: any) => (
                        <tr
                          key={myReadingList._id}
                          className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                        >
                          <td className="h-px w-px whitespace-nowrap">
                            <Link
                              className="block h-full p-6"
                              to={`/book-details/${myReadingList.book?._id}`}
                            >
                              <div className="flex items-center gap-x-4">
                                <img
                                  className="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-md"
                                  src={
                                    myReadingList.book?.imgURL !== ""
                                      ? myReadingList.book?.imgURL
                                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                  }
                                  alt="Image Description"
                                />
                                <div>
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {myReadingList.book?.title}
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
                                    calculateRatings(
                                      myReadingList.book?.reviews
                                    ) as number
                                  }
                                  readonly
                                  size={20}
                                />
                                <div className="pt-1 pl-2">
                                  {calculateRatings(
                                    myReadingList.book?.reviews
                                  )}{" "}
                                  out of 5
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-6 py-3 ">
                              {myReadingList?.status === "finished reading" && (
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                  </svg>
                                  Finished reading
                                </span>
                              )}

                              {myReadingList?.status === "reading" && (
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-green-200">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                  </svg>
                                  Reading
                                </span>
                              )}

                              {myReadingList?.status === "plan to read" && (
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-green-200">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                  </svg>
                                  Plan to read
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="block h-full p-6">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {format(
                                  new Date(myReadingList.book?.publicationDate),
                                  "dd MMM yyyy"
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-6 py-1.5">
                              <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                                <button
                                  id="hs-table-dropdown-1"
                                  type="button"
                                  className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-md text-gray-700 align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                  </svg>
                                </button>
                                <div
                                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700"
                                  aria-labelledby="hs-table-dropdown-1"
                                >
                                  <div className="py-2 first:pt-0 last:pb-0">
                                    <button
                                      className="flex w-full items-center gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                      onClick={() =>
                                        updateMyReadinglistHandler(
                                          myReadingList._id,
                                          "plan to read"
                                        )
                                      }
                                    >
                                      Plan to read
                                    </button>
                                    <button
                                      className="flex items-center w-full gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                      onClick={() =>
                                        updateMyReadinglistHandler(
                                          myReadingList._id,
                                          "reading"
                                        )
                                      }
                                    >
                                      Reading
                                    </button>
                                    <button
                                      className="flex items-center w-full gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                      onClick={() =>
                                        updateMyReadinglistHandler(
                                          myReadingList._id,
                                          "finished reading"
                                        )
                                      }
                                    >
                                      Finished reading
                                    </button>
                                  </div>
                                  <div className="py-2 first:pt-0 last:pb-0">
                                    <button
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700"
                                      onClick={() =>
                                        deleteMyReadinglistHandler(
                                          myReadingList._id
                                        )
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
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
