import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_AUTHOR_RECIPES } from "../utils/queries";
import { useParams, Link } from "react-router-dom";
import "./style.css";

initMDB({ Ripple });

function AuthorRecipes() {
  const { username } = useParams();
  const { loading, error, data } = useQuery(QUERY_AUTHOR_RECIPES, {
    variables: { username: username },
  });

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!loading && data && data.user.recipes) {
      setRecipes(data.user.recipes);
    } else if (!loading && error) {
      console.error("Error fetching data:", error);
    }
  }, [data, loading, error]);

  console.log(data);
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-center mt-3 mb-0">Recipes of {username}</h2>

      <section className="md-container m-auto" id="family-recipes">
        {recipes.length !== 0 ? (
          <div className="d-flex p-3 flex-wrap" id="cardContainer">
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
                  <Link
                    to={`/recipe/${recipe?._id}`}
                    className="btn"
                    data-mdb-ripple-init
                  >
                    See Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            There is no recipe added to this author yet!
          </div>
        )}
      </section>
    </>
  );
}

export default AuthorRecipes;
