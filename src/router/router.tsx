import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import LoginPage from "../components/Pages/LoginPage";
import SignupPage from "../components/Pages/SignupPage";
import CommentsPage from "../components/Pages/CommentsPage";
import UsersPage from "../components/Pages/UsersPage";
import ErrorPage from "../components/Pages/ErrorPage";
import RouteWrapper from "./RouterWrapper";
import EditPage from "../components/Pages/EditPage";


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
		{
			path: "/comments",
			element: (
				<RouteWrapper>
					<CommentsPage />
				</RouteWrapper>
			),
		},
		{
			path: "/users",
			element: (
				<RouteWrapper>
					<UsersPage />
				</RouteWrapper>
			),
		},
		{
			path: "/edit/:id",
			element: (
				<RouteWrapper>
					<EditPage />
				</RouteWrapper>
			),
		},
   ])

   return <RouterProvider router={router} />;
}

export default Router;
