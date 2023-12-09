import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';


// import Dashboard from './pages/Dashboard.jsx';
// import AddRecipe from './pages/AddRecipe.jsx';
// import FamilyRecipes from './pages/FamilyRecipes.jsx';
// import FamilySearch from './pages/FamilySearch.jsx';
// import Login from './pages/Login.jsx';
// import Recipe from '../../server/models/Recipe.js';

// Import MDB
// Example: Adjust import path based on package structure or documentation
import * as mdb from 'mdb-ui-kit'; // lib
window.mdb = mdb;

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add" element={<AddRecipe />} />
      <Route path="/family-recipes" element={<FamilyRecipes />} />
      <Route path="/family-search" element={<FamilySearch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipe/:id" element={<Recipe />} /> */}
    </Routes>
  </Router>
);
