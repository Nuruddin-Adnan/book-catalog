import Hero from "../../components/Hero";
import Subscribe from "../../components/Subscribe";
import BookCard from "../../components/BookCard";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="pb-20 pt-10">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">
              Our Letest Book
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Get all the latest Book here.
            </p>
          </div>
          <div className="grid gap-5 grid-cols-5 lg:px-10 px-4">
            <BookCard />
            <BookCard />
            <BookCard />
          </div>
        </div>
      </section>
      <div className="mb-6">
        <Subscribe />
      </div>
      <Footer />
    </>
  );
}
