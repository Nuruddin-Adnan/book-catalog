export default function BookCard() {
  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform">
        <div className="overflow-hidden">
          <img
            src="http://exprostudio.com/html/book_library/images/books/img-04.jpg"
            alt="Blog"
            className="w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <div className="px-6 py-4">
          <div className="text-xs text-gray-500">Sports</div>
          <div className="font-semibold text-md mb-2">Very good image</div>
          <div className="text-sm text-gray-700">By: Adnan</div>
          <div className="text-sm text-gray-600">10 september 2023</div>
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
