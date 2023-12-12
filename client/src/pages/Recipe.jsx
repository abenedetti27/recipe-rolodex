import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_RECIPE } from "../utils/queries";
 
function Recipe() {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});
  const [family, setFamily] = useState({});

  const { loading, data, error } = useQuery(QUERY_RECIPE, {
    variables: { id: recipeId },
  });

  useEffect(() => {
    if (data) {setRecipe(data.recipe);}
  }, [data, loading, error]);

  useEffect(() => {
    if (data && data.recipe && data.recipe.families && data.recipe.families.name) {
      setFamily(data.recipe.families);
    }
  }, [data, loading, error])

    const handleReturnToRecipes = () => {
      // Use the navigate function to navigate back
      navigate(-1); // This is equivalent to navigating back one step
    };

  return (
    <div className="container d-flex justify-content-center align-items-center text-center">
    {recipe ? (
        <div className="row ">
          <div className="m-4">
            <div className="card w-100">
              <img
                src={recipe.photo}
                alt={recipe.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h1 className="card-title m-2">{recipe.name}</h1>
                <div className="card-text">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="small m-2"><span className="field-title">Cooking Time:</span> {recipe.cookingTime} minutes</p>
                    </div>
                    <div className="col-md-6">
                    <p className="small m-2"><span className="field-title">Serving Size:</span> {recipe.servingSize} servings</p>
                    </div>
                    <div className="col-md-6">
                      <span className="field-title">Cooking Instructions: </span> 
                      {recipe.instructions}
                    </div>
                    <div className="col-md-6">
                      <span className="field-title">Ingredients: </span> {recipe.ingredients}
                    </div>
                  </div>
                </div>
                <Link to={`/familyrecipes/${family?._id}`} className="m-2">
                  <span className="badge bg-success">
                  <i className="fas fa-users"></i> Family: {family?.name ||""}
                  </span>
                </Link>
                <Link to="" className="m-2">
                  <span className="badge bg-info">
                  <i className="fas fa-user"></i> Author: {recipe.author}
                  </span>
                </Link>
                <Link to="" className="m-2">
                  <span className="badge bg-warning">
                  <i className="fas fa-thumbtack"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="m-4">
            {/* If we could find a way for this to return to previous page instead of home, that would be better. */}
            <Link to="/">
              <span className="badge bg-secondary" onClick={handleReturnToRecipes}
              style={{ cursor: "pointer" }}>
              <i className="fas fa-arrow-left-long"></i> Return to Recipes
              </span>
            </Link>
          </div>
        </div>
      ) : null}
      {loading ? <div>Loading...</div> : null}
    </div>
  );
}

export default Recipe;
