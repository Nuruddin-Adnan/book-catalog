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
import MyReadingList from "../pages/MyReadingList/MyReadingList";
import MyBooks from "../pages/MyBooks/MyBooks";
import EditBook from "../pages/EditBook/EditBook";
import AllBooks from "../pages/AllBooks/AllBooks";

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
        path: "/my-reading-list",
        element: (
          <PrivateRoute>
            <MyReadingList />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path: `/edit-book/:id`,
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: `/book-details/:id`,
        element: <BookDetails />,
      },
      {
        path: `/all-books`,
        element: <AllBooks />,
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
