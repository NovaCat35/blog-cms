import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import ErrorPage from "../components/Pages/ErrorPage";

const Router = () => {
   const router = createBrowserRouter([
      {
         path: "/",
			element: <Home />,
         errorElement: <ErrorPage />,
      }
   ])

   return <RouterProvider router={router} />;
}

export default Router;
