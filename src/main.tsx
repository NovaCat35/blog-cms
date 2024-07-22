import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./router/router";
import "./styles/tailwind.css";
import "./styles/App.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Routes />
	</React.StrictMode>
);
