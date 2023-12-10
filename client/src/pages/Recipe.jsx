import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_RECIPE } from "../utils/queries";

function Recipe() {
  const { id: recipeId } = useParams();

  const [recipe, setRecipe] = useState({});

  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { id: recipeId },
  });

    useEffect(() => {
        if (data) {
      setRecipe(data.recipe);
    }}, [data]);

  return (
    <>
    {recipe ? (
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card">
              <img
                src="../assets/spaghetti.jpg"
                alt="Spaghetti Bolognese"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="field-title">Cooking Time:</span> {recipe.cookingTime} minutes
                    </div>
                    <div className="col-md-6">
                      <span className="field-title">Serving Size:</span> {recipe.servingSize} servings
                    </div>
                    <div className="col-md-6">
                      <span className="field-title">Cooking Instructions:</span>
                      {recipe.instructions}
                    </div>
                    <div className="col-md-6">
                      <span className="field-title">Ingredients:</span> {recipe.ingredients}
                    </div>
                  </div>
                </p>
                <Link to="">
                  <span className="badge bg-success">
                    <i className="bi bi-people-fill"></i> Family: {recipe.family}
                  </span>
                </Link>
                <Link to="">
                  <span className="badge bg-info">
                    <i className="bi bi-person-fill"></i> Author: {recipe.author}
                  </span>
                </Link>
                <Link to="">
                  <span className="badge bg-warning">
                    <i className="bi bi-pin-angle-fill"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div>
            {/* If we could find a way for this to return to previous page instead of home, that would be better. */}
            <Link to="/">
              <span className="badge bg-secondary">
                <i className="bi bi-arrow-bar-left"></i> Return to Recipes
              </span>
            </Link>
          </div>
        </div>
      </div>
      ) : null}
      {loading ? <div>Loading...</div> : null}
    </>
  );
}

export default Recipe;
