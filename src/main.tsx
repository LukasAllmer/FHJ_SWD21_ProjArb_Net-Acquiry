import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./sites/main.tsx";
import "./index.sass";
import ErrorPage from "./sites/error-page.tsx";
import Request from "./sites/request.tsx";
import Submitted from "./sites/submitted.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		errorElement: <ErrorPage />,
	},
	{
		path: "request",
		element: <Request />,
	},
	{
		path: "submitted",
		element: <Submitted />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
