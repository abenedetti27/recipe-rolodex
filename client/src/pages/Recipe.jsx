/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import { QUERY_RECIPE, QUERY_USER } from "../utils/queries";
import { PIN_RECIPE, UNPIN_RECIPE } from "../utils/mutations";
import "./style.css";
import Auth from "../utils/auth";

function Recipe() {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});
  const [family, setFamily] = useState({});
  const loggedIn = Auth.loggedIn();
  const [pinned, setPinned] = useState(false);
  const [pinCounter, setpinCounter] = useState(0);

  const [pinRecipe] = useMutation(PIN_RECIPE);
  const [unpinRecipe] = useMutation(UNPIN_RECIPE);

  const { loading, data, error } = useQuery(QUERY_RECIPE, {
    variables: { id: recipeId },
  });

  useEffect(() => {
    if (data) {
      setRecipe(data.recipe);
      setpinCounter(parseInt(data.recipe.pinCount));
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (
      data &&
      data.recipe &&
      data.recipe.families &&
      data.recipe.families.name
    ) {
      setFamily(data.recipe.families);
    }
  }, [data, loading, error]);

  const handleReturnToRecipes = () => {
    // Use the navigate function to navigate back
    navigate(-1); // This is equivalent to navigating back one step
  };

  const [getUser, userData] = useLazyQuery(QUERY_USER);

  useEffect(() => {
    if (loggedIn) {
      getUser({
        variables: { username: Auth.getProfile().authenticatedPerson.username },
      });
    }
  }, [data, loggedIn, getUser]);

  useEffect(() => {
    if (
      userData &&
      userData.data &&
      userData.data.user &&
      userData.data.user.pinnedRecipes
    ) {
      if (
        userData.data.user.pinnedRecipes.find(
          (recipe) => recipe._id === recipeId
        )
      ) {
        setPinned(true);
      }
    }
  }, [userData, recipeId]);

  const pinHandler = async () => {
    const { data } = await pinRecipe({
      variables: { id: recipeId },
    });
    setPinned(true);
    setpinCounter(pinCounter + 1);
  };

  const unpinHandler = async () => {
    const { data } = await unpinRecipe({
      variables: { id: recipeId },
    });
    setPinned(false);
    setpinCounter(pinCounter - 1);
  };
  console.log(pinCounter);
  return (
    <>
      {recipe ? (
        <div>
          <div className="m-4 d-flex justify-content-center align-items-center ">
            <div className="card w-75">
              <img
                src={recipe.photo}
                alt={recipe.name}
                className="card-img-top"
                id="recipe-image"
              />
              <div className="card-body">
                <h1 className="card-title mb-2 mt-0 print-spacing">
                  {recipe.name}
                </h1>
                <div className="d-flex justify-content-center m-auto mb-1">
                  <div className="row mt-2">
                    <div className="col m-auto p-auto">
                      <Link to={`/familyrecipes/${family?._id}`}>
                        <div className="badge pink-badge p-auto m-auto">
                          <i className="fas fa-users fa-lg m-2"></i>
                          <p className=" m-0">Family: {family?.name || ""}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col m-auto p-auto">
                      <Link to={`/authorrecipes/${recipe.author}`}>
                        <div className="badge pink-badge p-auto m-auto">
                          <i className="fas fa-user fa-lg m-2"></i>
                          <p className=" m-0">Author: {recipe.author}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-text m-3 print-spacing px-4 text-start">
                  <div className="row p-3 print-spacing">
                    <div className="col-md-6 mb-3">
                      <div className="field-title m-0">Cooking Time:</div>{" "}
                      {recipe.cookingTime} minutes
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="field-title m-0">Serving Size:</div>{" "}
                      {recipe.servingSize} servings
                    </div>
                    <div className="col-md-6 mb-2 print-spacing">
                      <div className="field-title m-0">Ingredients: </div>{" "}
                      <div className="textwrap">{recipe.ingredients}</div>
                    </div>
                    <div className="col-md-6 mb-2 print-spacing">
                      <div className="field-title m-0">
                        Cooking Instructions:{" "}
                      </div>
                      <div className="textwrap">{recipe.instructions}</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="row">
                    <div className="col m-auto p-1">
                      <div>
                        {loggedIn !== false ? (
                          <>
                            {pinned !== false ? (
                              <div
                                className="badge badge-light p-auto"
                                onClick={unpinHandler}
                              >
                                <i
                                  className="fa-solid fa-thumbtack fa-2x p-auto"
                                  style={{ color: "#F139AA" }}
                                ></i>
                              </div>
                            ) : (
                              <div
                                className="badge badge-light p-auto"
                                onClick={pinHandler}
                              >
                                <i
                                  className="fa-solid fa-thumbtack fa-2x p-auto"
                                  style={{ color: "#b598a3" }}
                                ></i>
                              </div>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="col m-auto p-1">
                      {pinCounter ? (
                        pinCounter === 1 ? (
                          <div style={{ minWidth: 125, fontSize: 13 }}>
                            Pinned by {pinCounter} user
                          </div>
                        ) : (
                          <div style={{ minWidth: 125, fontSize: 13 }}>
                            Pinned by {pinCounter} users
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>

                    {/* Socmed Items */}
                    <div className="d-flex justify-content-center">
                      <div className="col">
                        <h6 className="m-1 p-0 socmed"><b><u>Share</u></b></h6>
                        <div className="row">
                          <div className="col m-auto p-1 socmed">
                            <div
                              className="badge py-2 px-1 m-auto print-icon"
                            >
                              <i
                                className="fas fa-print mt-2 p-auto fa-lg"
                                onClick={() => window.print()}
                                media="print"
                              ></i>
                            </div>
                          </div>
                          <div className="col m-auto p-1 socmed">
                            <FacebookShareButton
                              url={
                                "https://recipe-rolodex-d7c0cb19d5d1.herokuapp.com/recipe/" +
                                recipeId
                              }
                              hashtag={"#reciperolodex"}
                            >
                              <FacebookIcon
                                size={32}
                                bgStyle={{ fill: "#df85a9" }}
                                borderRadius={"8px"}
                              />
                            </FacebookShareButton>
                          </div>
                          <div className="col m-auto p-1 socmed">
                            <LinkedinShareButton
                              url={
                                "https://recipe-rolodex-d7c0cb19d5d1.herokuapp.com/recipe/" +
                                recipeId
                              }
                            >
                              <LinkedinIcon
                                size={32}
                                bgStyle={{ fill: "#df85a9" }}
                                borderRadius={"8px"}
                              />
                            </LinkedinShareButton>
                          </div>
                          <div className="col m-auto p-1 socmed">
                            <TwitterShareButton
                              url={
                                "https://recipe-rolodex-d7c0cb19d5d1.herokuapp.com/recipe/" +
                                recipeId
                              }
                              hashtags={["reciperolodex"]}
                            >
                              <TwitterIcon
                                size={32}
                                bgStyle={{ fill: "#df85a9" }}
                                borderRadius={"8px"}
                              />
                            </TwitterShareButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4">
            {/* If we could find a way for this to return to previous page instead of home, that would be better. */}
            <Link to="/">
              <div
                className="badge bg-secondary return-to-recipes"
                onClick={handleReturnToRecipes}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-arrow-left-long"></i> Return to Recipes
              </div>
            </Link>
          </div>
        </div>
      ) : null}
      {loading ? <div>Loading...</div> : null}
    </>
  );
}

export default Recipe;
