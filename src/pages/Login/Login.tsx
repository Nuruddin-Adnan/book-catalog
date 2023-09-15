// import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { setAccessToken, setUser } from "../../redux/features/auth/authSlice";
import jwt_decode from "jwt-decode";
import { errorToast } from "../../hooks/useToast";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // ! set the user info to redux storage. The setAuth function need to call into login handler
  const [loginMutation] = useLoginMutation();
  const dispatch = useAppDispatch();

  const setAuth = (accessToken: string) => {
    const decodedUser = jwt_decode(accessToken);
    if (decodedUser) {
      dispatch(setAccessToken(accessToken));
      dispatch(setUser(decodedUser));

      const authData = { user: decodedUser, accessToken: accessToken };
      sessionStorage.setItem("authData", JSON.stringify(authData));
    }
  };
  // ! end the set user info

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await loginMutation(data);

    if ("error" in response) {
      if (response.error && "data" in response.error) {
        const errorData = response.error.data as { message: string }; // Adjust the type accordingly
        errorToast(errorData.message);
      }
    } else {
      const data = response.data.data;
      const accessToken = data.accessToken;
      setAuth(accessToken);
      reset();
      if (accessToken) {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="dark:bg-slate-900 bg-gray-100 min-h-screen grid place-items-center py-4">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <Link
                to="/"
                className="block md:text-4xl text-xl mb-6 font-bold text-blue-600 dark:text-white"
              >
                Bookcat
              </Link>
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account yet?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  to="/signup"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label className="block text-sm mb-2 dark:text-white">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="py-3 px-4 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        {...register("email", {
                          required: "Email Address is required",
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      <div
                        className={`${
                          !errors.email && "hidden"
                        } absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3`}
                      >
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 dark:text-white"
                      >
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
                      <div
                        className={`${
                          !errors.password && "hidden"
                        } absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3`}
                      >
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Sign in
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
