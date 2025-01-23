import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Component/Homepage";
import MakeTemplate from "./Component/MakeTemplate";
import { emailBuilderLoader } from "./Component/loader"; // Define loader function
import RenderTemplate from "./Component/RenderTemplate";

// Define the routes with loader
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/emailBuild",
    element: <MakeTemplate />,
    loader: emailBuilderLoader, // Add the loader for the route
  },
  {
    path: "/download",
    element: <RenderTemplate />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
