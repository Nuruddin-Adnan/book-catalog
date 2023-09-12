export default function Hero() {
  return (
    <section className="grid place-items-center xl:min-h-[calc(100vh-69px)]">
      <div className="container px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              For All Your Reading Needs
              {/* <span className="text-blue-600">Preline</span> */}
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">
              Let's embark on this literary journey, where the power of reading
              becomes a beacon of inspiration, lighting up our lives and guiding
              us toward boundless creativity and knowledge.
            </p>

            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <a
                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                href="#"
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
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative ml-4">
            <img
              className="w-full rounded-md"
              src="/assets/images/slider-img.png"
              alt="Image Description"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
