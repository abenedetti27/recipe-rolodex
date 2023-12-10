import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Dashboard from './pages/Dashboard.jsx';
// import AddRecipe from './pages/AddRecipe.jsx';
// import FamilyRecipes from './pages/FamilyRecipes.jsx';
// import FamilySearch from './pages/FamilySearch.jsx';
import Login from './pages/Login.jsx';
import Recipe from './pages/Recipe.jsx';

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
      // {
      //   path:'/dashboard',
      //   index: false, 
      //   element: <Dashboard />
      // },
      // {
      //   path:'/addrecipe',
      //   index: false, 
      //   element: <AddRecipe />
      // },
      // {
      //   path:'/familyrecipes',
      //   index: false, 
      //   element: <FamilyRecipes />
      // },
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
        path:'/recipe',
        index: false, 
        element: <Recipe />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)