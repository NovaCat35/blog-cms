import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import LoginPage from "../components/Pages/LoginPage";
import SignupPage from "../components/Pages/SignupPage";
import ErrorPage from "../components/Pages/ErrorPage";
import RouteWrapper from "./RouterWrapper";


const Router = () => {
   const router = createBrowserRouter([
      {
         path: "/",
			element: (
				<RouteWrapper>
					<Home />
				</RouteWrapper>
			),         errorElement: <ErrorPage />,
      },
      {
			path: "/login",
			element: (
				<RouteWrapper>
					<LoginPage />
				</RouteWrapper>
			),
		},
		{
			path: "/signup",
			element: (
				<RouteWrapper>
					<SignupPage />
				</RouteWrapper>
			),
		},
   ])

   return <RouterProvider router={router} />;
}

export default Router;
