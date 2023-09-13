import { Link, useParams } from "react-router-dom";
import {
  useAddBookReviewMutation,
  useGetSingleBookQuery,
} from "../../redux/features/books/bookApi";
import { format } from "date-fns";
import { Rating } from "react-simple-star-rating";
import { IReview, calculateRatings } from "../../lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { errorToast, successToast } from "../../hooks/useToast";
import { useAppSelector } from "../../redux/hook";
import { AuthState } from "../../types/auth";

export default function BookDetails() {
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>();

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const { id } = useParams();
  const { user } = useAppSelector((state: { auth: AuthState }) => state.auth);
  const { data, isLoading, error } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [addBookReview] = useAddBookReviewMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<Partial<IReview>> = async (data: any) => {
    if (rating === 0) {
      return errorToast("Please provide your rating");
    }
    data.ratings = rating;

    const response = await addBookReview({ id, data });

    if ("error" in response) {
      if (response.error && "data" in response.error) {
        const errorData = response.error.data as { message: string }; // Adjust the type accordingly
        errorToast(errorData.message);
      }
    } else {
      successToast(response.data.message);
      setRating(0);
      reset();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  // console.log(data);

  return (
    <div className="container">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 sm:items-center gap-8">
          <div className="sm:order-2">
            <div className="relative pt-[50%] sm:pt-[100%] rounded-lg">
              <img
                className="w-full h-full absolute top-0 left-0 object-cover rounded-lg"
                src={
                  data.data?.imgURL !== ""
                    ? data.data?.imgURL
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                }
                alt="Image Description"
              />
            </div>
          </div>

          <div className="sm:order-1">
            <p className="mb-5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {data.data?.genre}
            </p>

            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight text-gray-800 dark:text-gray-200">
              {data.data?.title}
            </h2>

            <div className="mt-6 sm:mt-10 flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-600">
                  <span className="font-medium text-white leading-none">
                    {data.data?.author.name?.firstName[0] +
                      data.data?.author.name?.lastName[0]}
                  </span>
                </span>
              </div>

              <div className="ml-3 sm:ml-4">
                <p className="sm:mb-1 font-semibold text-gray-800 dark:text-gray-200">
                  By:{" "}
                  {data.data?.author.name?.firstName +
                    " " +
                    data.data?.author.name?.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(data.data?.publicationDate), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            <div className="star-rating my-5 flex items-center">
              <Rating
                initialValue={calculateRatings(data.data.reviews) as number}
                readonly
                size={30}
              />
              <p className="pt-1 pl-2">
                ({calculateRatings(data.data.reviews) as number} out of 5),
                <span className="px-2">
                  {data.data?.reviews.length}
                  <span> reviews</span>
                </span>
              </p>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              {data.data?.description}
            </p>
          </div>
        </div>
      </div>
      {/* review section start */}
      <div className="py-10">
        <h2 className="text-2xl font-bold text-gray-700 border-b mb-5">
          Review
        </h2>
        <ul>
          {data.data?.reviews.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.data?.reviews.map((review: any, index: number) => (
              <li key={index} className="border-b py-3">
                <div className="group">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-600">
                        <span className="font-medium text-white leading-none">
                          {review?.reviewedBy.name?.firstName[0] +
                            review?.reviewedBy.name?.lastName[0]}
                        </span>
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {review?.reviewedBy.name?.firstName +
                          " " +
                          review?.reviewedBy.name?.lastName}
                      </h3>
                      <p className="text-sm font-medium text-gray-400">
                        {format(new Date(review?.reviewdate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="star-rating py-2">
                    <Rating initialValue={review?.ratings} readonly size={20} />
                  </div>
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    {review?.message}
                  </p>
                </div>
              </li>
            ))}
          {user ? (
            <li className="py-3">
              <h2 className="text-2xl font-semibold text-blue-500 mb-3 mt-5">
                Add a review
              </h2>
              <div className="bg-white border shadow-sm rounded-xl p-4 md:p-5">
                <div className="star-rating mb-3">
                  <Rating
                    initialValue={rating}
                    onClick={handleRating}
                    allowFraction
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium dark:text-white">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("message", {
                        required: "Message is required",
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500">{errors.message?.message}</p>
                    )}
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                    >
                      Add Review
                    </button>
                  </div>
                </form>
              </div>
            </li>
          ) : (
            <li className="py-3 mt-3">
              <Link
                className="text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                to="/login"
              >
                Please Login to review
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* end of review section */}
    </div>
  );
}
