import { SubmitHandler, useForm } from "react-hook-form";
import Subscribe from "../../components/Subscribe";
import { IBook } from "../../types/book";
import { useAppSelector } from "../../redux/hook";
import { AuthState } from "../../types/auth";
import { useCreateBookMutation } from "../../redux/features/books/bookApi";
import { errorToast, successToast } from "../../hooks/useToast";

export default function AddNewBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  const { user } = useAppSelector((state: { auth: AuthState }) => state.auth);
  const [createbook] = useCreateBookMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<Partial<IBook>> = async (data: any) => {
    data.publicationDate = new Date(data.publicationDate);
    data.author = user!._id;
    const response = await createbook(data);

    if ("error" in response) {
      if (response.error && "data" in response.error) {
        const errorData = response.error.data as { message: string }; // Adjust the type accordingly
        errorToast(errorData.message);
      }
    } else {
      successToast(response.data.message);
      reset();
    }
  };
  return (
    <>
      <div className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid items-center gap-12">
          <div className="relative">
            <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Add a new book
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6 grid gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 font-medium dark:text-white">
                      Book Title
                    </label>
                    <input
                      type="text"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("title", {
                        required: "Name is required",
                        minLength: 3,
                        maxLength: 100,
                      })}
                      aria-invalid={errors.title ? "true" : "false"}
                    />
                    {errors.title && (
                      <p className="text-red-500">{errors.title?.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 font-medium dark:text-white">
                        Select Genre
                      </label>
                      <select
                        className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        {...register("genre", {
                          required: "Genre is required",
                        })}
                      >
                        <option value="">Please select a genre</option>
                        <option value="sports">sports</option>
                        <option value="poit">poit</option>
                        <option value="self help">self help</option>
                      </select>
                      {errors.genre && (
                        <p className="text-red-500">{errors.genre?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 font-medium dark:text-white">
                        Publication date
                      </label>
                      <input
                        type="date"
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        {...register("publicationDate", {
                          required: "Publication date is required",
                        })}
                      />
                      {errors.publicationDate && (
                        <p className="text-red-500">
                          {errors.publicationDate?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 font-medium dark:text-white">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("imgURL")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 font-medium dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500">
                        {errors.description?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Subscribe />
    </>
  );
}
