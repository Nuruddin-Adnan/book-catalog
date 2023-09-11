import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { BsHeart, BsBook } from "react-icons/bs";

export default function BookCard() {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    setRating(() => 0);
  }, []);
  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform group/item">
        <div className="overflow-hidden relative">
          <img
            src="http://exprostudio.com/html/book_library/images/books/img-04.jpg"
            alt="Blog"
            className="w-full object-cover transition-all group-hover:scale-105"
          />
          <div className="absolute transition-all group-hover/item:bg-black/25 opacity-0 group-hover/item:opacity-100 w-full h-full top-0 left-0 p-5 ">
            <div className="hs-tooltip block mb-2 [--placement:left] group/wishlist">
              <button className="rounded-full w-10 h-10 grid place-items-center bg-white hs-tooltip-toggle group-hover/wishlist:bg-blue-600 group-hover/wishlist:text-white transition-all">
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
          <div className="text-xs text-gray-500">Sports</div>
          <div className="font-semibold text-md mb-2">Very good image</div>
          <div className="text-sm text-gray-700">By: Adnan</div>
          <div className="text-sm text-gray-600">10 september 2023</div>
        </div>
        <div className="star-rating px-6">
          <Rating initialValue={rating} readonly size={20} />
        </div>
        <div className="px-6 pt-4 pb-2 mb-6">
          <a
            href="#"
            className="border border-blue-500 hover:bg-blue-700 text-blue-500 hover:text-white transition-all text-center font-bold py-2 px-4 w-full block rounded-full"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
}
