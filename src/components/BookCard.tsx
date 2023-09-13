import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { BsHeart, BsBook } from "react-icons/bs";
import { IBook } from "../types/book";
import { calculateRatings } from "../lib/utils";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAddToWishlistMutation } from "../redux/features/wishlist/wishlistApi";
import { errorToast, successToast } from "../hooks/useToast";

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { _id, title, author, genre, publicationDate, imgURL, reviews } = book;

  const [rating, setRating] = useState<number>(0); // Initialize as a string
  const [addToWishlist] = useAddToWishlistMutation();

  useEffect(() => {
    if (reviews) {
      const calculatedRating = calculateRatings(reviews);
      setRating(calculatedRating as number);
    }
  }, [reviews]);

  const addToWishlistHandler = async (bookId: string) => {
    const response = await addToWishlist({ book: bookId });
    if ("error" in response) {
      if (response.error && "data" in response.error) {
        const errorData = response.error.data as { message: string };
        errorToast(errorData.message);
      }
    } else {
      successToast(response.data.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform group/item">
        <div className="overflow-hidden relative">
          <img
            src={imgURL}
            alt="Blog"
            className="w-full object-cover transition-all group-hover:scale-105"
          />
          <div className="absolute transition-all group-hover/item:bg-black/25 opacity-0 group-hover/item:opacity-100 w-full h-full top-0 left-0 p-5 ">
            <div className="hs-tooltip block mb-2 [--placement:left] group/wishlist">
              <button
                className="rounded-full w-10 h-10 grid place-items-center bg-white hs-tooltip-toggle group-hover/wishlist:bg-blue-600 group-hover/wishlist:text-white transition-all"
                onClick={() => addToWishlistHandler(_id as string)}
              >
                <BsHeart />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                  role="tooltip"
                >
                  Add to wishlist
                </span>
              </button>
            </div>
            <div className="hs-tooltip block [--placement:left] group/my-reading-list">
              <button className="rounded-full w-10 h-10 grid place-items-center bg-white hs-tooltip-toggle group-hover/my-reading-list:bg-blue-600 group-hover/my-reading-list:text-white transition-all">
                <BsBook />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                  role="tooltip"
                >
                  Add to reading list
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-2">
          <div className="text-xs text-gray-500 uppercase">{genre}</div>
          <div className="font-semibold text-md mb-2">{title}</div>
          <div className="text-sm text-gray-700">
            By:
            {typeof author === "object"
              ? author.name?.firstName + " " + author.name?.lastName
              : author}
          </div>
          <div className="text-sm text-gray-600">
            {format(new Date(publicationDate), "MMM dd, yyyy")}
          </div>
        </div>
        <div className="star-rating px-6 flex items-center">
          <Rating initialValue={rating} readonly size={20} />
          <p className="pt-1 pl-2">({rating}/5)</p>
        </div>
        <div className="px-6 pt-4 pb-2 mb-6">
          <Link
            to={`/book-details/${_id}`}
            className="border border-blue-500 hover:bg-blue-700 text-blue-500 hover:text-white transition-all text-center font-bold py-2 px-4 w-full block rounded-full"
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;
