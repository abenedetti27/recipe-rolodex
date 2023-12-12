import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_FAMILY_RECIPE } from "../utils/queries";
import "../components/RecipeCard/style.css";
import { useParams } from 'react-router-dom';

initMDB({ Ripple });

function FamilyRecipes() {
    const { familyId } = useParams();
    console.log(familyId);
    const { loading, error, data, refetch } = useQuery(QUERY_FAMILY_RECIPE, {
        variables: { familyId: familyId },
      });

  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    console.log(data); 
    if (!loading && data && data.recipes) {
      setRecipes(data.recipes);
    } else if (!loading && error) {
      console.error("Error fetching data:", error);
    }
  }, [data, loading, error]);
  
  // Refetch the query after a delay (e.g., 500 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 500);
  
    return () => clearTimeout(timer);
  }, [familyId, refetch]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <>
        <h1 className="text-center">Family Recipes</h1>
      <section className="md-container m-auto" id="dashboard-recipes">
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
                <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
                  See Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FamilyRecipes;
