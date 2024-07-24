import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./router/router";
import BlogProvider from "./contexts/BlogContext";
import AuthProvider from "./contexts/AuthContext";
import NavbarProvider from "./contexts/NavContext";
import "./styles/tailwind.css";
import "./styles/App.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<NavbarProvider>
			<BlogProvider>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</BlogProvider>
		</NavbarProvider>
	</React.StrictMode>
);
