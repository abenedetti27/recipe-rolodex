import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Dashboard from './pages/Dashboard.jsx';
import AddRecipe from './pages/AddRecipe.jsx';
import FamilyRecipes from './pages/FamilyRecipes.jsx';
import Search from './pages/Search.jsx';
// import FamilySearch from './pages/FamilySearch.jsx';
import Login from './pages/Login.jsx';
import Recipe from './pages/Recipe.jsx';
import Cloudinary from './pages/Cloudinary.jsx';

// Import MDB
// Example: Adjust import path based on package structure or documentation
import * as mdb from 'mdb-ui-kit'; // lib

window.mdb = mdb;


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      },
      {
        path:'/dashboard',
        index: false, 
        element: <Dashboard />
      },
      {
        path:'/addrecipe',
        index: false, 
        element: <AddRecipe />
      },
      // {
      //   path:'/familysearch',
      //   index: false, 
      //   element: <FamilySearch />
      // },
      {
        path:'/login',
        index: false, 
        element: <Login />
      },
      {
        path:'/recipe/:id',
        index: false, 
        element: <Recipe />
      },
      {
        path:'/familyrecipes/:familyId',
        index: false, 
        element: <FamilyRecipes />
      },
      {
        path:'/cloudinary',
        index: false, 
        element: <Cloudinary />
      },
      {
        path:'/search/',
        index: false, 
        element: <Search />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)