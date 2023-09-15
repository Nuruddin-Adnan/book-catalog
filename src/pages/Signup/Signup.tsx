import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { errorToast, successToast } from "../../hooks/useToast";
type Inputs = {
  name?: {
    firstName: string | undefined;
    lastName: string | undefined;
  };
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  role: string;
  address: string;
  password: string;
  confirmPass?: string;
};

export default function Signup() {
  const [passConfirm, setPassConfirm] = useState<boolean>(true);
  const navigate = useNavigate();
  const [signMutation] = useSignupMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPass) {
      setPassConfirm(false);
    } else {
      setPassConfirm(true);
      delete data.confirmPass;
      data.name = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      delete data.firstName;
      delete data.lastName;
      data.role = "general_user";

      const response = await signMutation(data);

      if ("error" in response) {
        if (response.error && "data" in response.error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorData: any = response.error.data; // Adjust the type accordingly
          errorToast(errorData.errorMessages[0].message);
        }
      } else {
        successToast("Signup successfully"!);
        reset();
        navigate("/login");
      }
    }
  };

  return (
    <div className="dark:bg-slate-900 bg-gray-100 min-h-screen grid place-items-center py-4">
      <div className="w-full max-w-md mx-auto p-6">
        <div className=" bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <Link
                to="/"
                className="block md:text-4xl text-xl mb-6 font-bold text-blue-600 dark:text-white"
              >
                BookCat
              </Link>
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign up
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  to="/login"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 dark:text-white">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="py-3 px-4 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          aria-invalid={errors.firstName ? "true" : "false"}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-xs text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-2 dark:text-white">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="py-3 px-4 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          aria-invalid={errors.lastName ? "true" : "false"}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-xs text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 dark:text-white">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="py-3 px-4 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        {...register("email", {
                          required: "Email address is required",
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm mb-2 dark:text-white">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        className="py-3 px-4 block border w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm mb-2 dark:text-white">
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        className="py-3 px-4 block border w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        {...register("confirmPass", {
                          required: "Confirm password is required",
                        })}
                        aria-invalid={errors.confirmPass ? "true" : "false"}
                      />
                    </div>
                    {!passConfirm && (
                      <p className="text-xs text-red-600">
                        Confirm passwor doesnot match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
