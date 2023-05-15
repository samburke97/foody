import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "/homepage", element: <Homepage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
