import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { QUERY_RECIPE, QUERY_USER } from "../utils/queries";
import { PIN_RECIPE, UNPIN_RECIPE } from "../utils/mutations";
import './style.css';
import Auth from '../utils/auth';
 
function Recipe() {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});
  const [family, setFamily] = useState({});
  const loggedIn = Auth.loggedIn();
  const [pinned, setPinned] = useState(false);

  const [pinRecipe] = useMutation(PIN_RECIPE);
  const [unpinRecipe] = useMutation(UNPIN_RECIPE);

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

  const [ getUser, userData ] = useLazyQuery(QUERY_USER);

  useEffect(() => {
    if(loggedIn) {
      getUser({ variables: { username: Auth.getProfile().authenticatedPerson.username }});
    }
    if (userData && userData.data && userData.data.user && userData.data.user.pinnedRecipes) {
      console.log(userData.data)
      console.log(userData.data.user.pinnedRecipes);
      if (userData.data.user.pinnedRecipes.find((recipe) => recipe._id === recipeId)) {
        setPinned(true)
      }
    }
  }, [loggedIn, getUser, pinned])

  const pinHandler = async () => {
    const { data } = await pinRecipe({
      variables: { id: recipeId }
    });
    setPinned(true);
  };

  const unpinHandler = async () => {
    const { data } = await unpinRecipe({
      variables: { id: recipeId }
    });
    setPinned(false);
  }

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
                <span>
                  {loggedIn !== false ?
                    <>
                    {pinned !== false ? 
                    <span className="badge badge-light"  onClick={unpinHandler}>
                      <i className="fa-solid fa-thumbtack" style={{color: "#F139AA"}}></i>
                    </span>
                    : 
                    <span className="badge badge-light"  onClick={pinHandler}>
                      <i className="fa-thin fa-thumbtack" style={{color: "#F139AA"}} ></i>
                    </span>}
                    </> : <></>}
                </span>
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
