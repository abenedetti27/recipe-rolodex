import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import FamilyRecipes from "./pages/FamilyRecipes.jsx";
import AuthorRecipes from "./pages/AuthorRecipes.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import Recipe from "./pages/Recipe.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import PinnedRecipes from "./pages/PinnedRecipe.jsx";
import NoMatch from "./pages/NoMatch.jsx";
// Import MDB
// Example: Adjust import path based on package structure or documentation
import * as mdb from "mdb-ui-kit"; // lib

window.mdb = mdb;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        index: false,
        element: <Dashboard />,
      },
      {
        path: "/addrecipe",
        index: false,
        element: <AddRecipe />,
      },
      {
        path: "/login",
        index: false,
        element: <Login />,
      },
      {
        path: "/recipe/:id",
        index: false,
        element: <Recipe />,
      },
      {
        path: "/familyrecipes/:familyId",
        index: false,
        element: <FamilyRecipes />,
      },
      {
        path: "/authorrecipes/:username",
        index: false,
        element: <AuthorRecipes />,
      },
      {
        path: "/editrecipe/:id",
        index: false,
        element: <EditRecipe />,
      },
      {
        path: "/search/",
        index: false,
        element: <Search />,
      },
      {
        path: "/pinnedrecipes/",
        index: false,
        element: <PinnedRecipes />,
      },
    ],
  },
  {
    path: "*", // This is a catch-all route
    element: <NoMatch />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
