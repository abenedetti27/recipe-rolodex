import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link } from 'react-router-dom';
import "../components/RecipeCard/style.css";

// import { useParams } from 'react-router-dom';

import Auth from "../utils/auth";

initMDB({ Ripple });

// import RecipeCard from "../components/RecipeCard";
import FamilyCards from "../components/FamilyCards";

function Dashboard() {
  const username = Auth.getProfile().authenticatedPerson.username; // Replace this with your actual logic to get the user ID
  // const username = 'B-King';

  // const { username } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data && data.user && data.user.recipes) {
      setRecipes(data.user.recipes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <>
      <section className="md-container m-auto" id="dashboard-families">
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
          <FamilyCards />
        </div>
      </section>
      <section className="container m-auto justify-content-between d-flex">
        <h2>Your Recipes</h2>
        <div>
          <Link to={`/addrecipe/`} className="btn btn-success" data-mdb-ripple-init>Add New Recipe</Link>
        </div>
      </section>
      <section className="md-container m-auto" id="dashboard-recipes">
          <div className="d-flex p-3 flex-wrap" id="cardContainer">
            {recipes.length !==0 ? 
                <div>
                {recipes.map((recipe) => (
                  <div className="card mb-4" key={recipe._id}>
                    <div
                      className="bg-image hover-overlay"
                      data-mdb-ripple-init
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={recipe?.photo || ""}
                        className="img-fluid mb-0"
                        alt={recipe?.name || ""}
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        ></div>
                      </a>
                    </div>
                    <div className="card-body p-3">
                      <h5 className="card-title mb-2">
                        {recipe?.name || "No Title"}
                      </h5>
                      <Link to={`/recipe/${recipe?._id}`} className="btn btn-primary" data-mdb-ripple-init>
                    See Recipe
                  </Link>
                    </div>
                  </div>
                ))}
              </div>
              : <p>You have not added any recipes yet</p>}
          </div>
      </section>
    </>
  );
}

export default Dashboard;
