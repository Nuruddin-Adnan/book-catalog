import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import NotFound from "../pages/NotFound/NotFound";
import AddNewBook from "../pages/AddNewBook/AddNewBook";
import BookDetails from "../pages/BookDetails/BookDetails";
import MyWishlist from "../pages/MyWishlist/MyWishlist";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-wishlist",
        element: (
          <PrivateRoute>
            <MyWishlist />
          </PrivateRoute>
        ),
      },
      {
        path: `/book-details/:id`,
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
