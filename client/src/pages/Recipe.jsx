import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_RECIPE } from "../utils/queries";

function Recipe() {
  const { id: recipeId } = useParams();

  const [recipe, setRecipe] = useState({});

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { id: recipeId },
  });

    useEffect(() => {
        if (data) {
      setRecipe(data.recipe);
    }}, [data]);

  return (
    <>
    {recipe ? (
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card">
              <img
                src="../assets/spaghetti.jpg"
                alt="Spaghetti Bolognese"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title">{recipe.name}</h5>
                <p class="card-text">
                  <div class="row">
                    <div class="col-md-6">
                      <span class="field-title">Cooking Time:</span> {recipe.cookingTime} minutes
                    </div>
                    <div class="col-md-6">
                      <span class="field-title">Serving Size:</span> {recipe.servingSize} servings
                    </div>
                    <div class="col-md-6">
                      <span class="field-title">Cooking Instructions:</span>
                      {recipe.instructions}
                    </div>
                    <div class="col-md-6">
                      <span class="field-title">Ingredients:</span> {recipe.ingredients}
                    </div>
                  </div>
                </p>
                <Link to="">
                  <span class="badge bg-success">
                    <i class="bi bi-people-fill"></i> Family: {recipe.family}
                  </span>
                </Link>
                <Link to="">
                  <span class="badge bg-info">
                    <i class="bi bi-person-fill"></i> Author: {recipe.author}
                  </span>
                </Link>
                <Link to="">
                  <span class="badge bg-warning">
                    <i class="bi bi-pin-angle-fill"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div>
            {/* If we could find a way for this to return to previous page instead of home, that would be better. */}
            <Link to="/">
              <span class="badge bg-secondary">
                <i class="bi bi-arrow-bar-left"></i> Return to Recipes
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
