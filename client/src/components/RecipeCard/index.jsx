import { useState, useEffect } from 'react';
import { initMDB } from 'mdb-ui-kit';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPES } from '../../utils/queries';

initMDB();

const RecipeCard = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_RECIPES);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data && data.recipes) {
      setRecipes(data.recipes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <>
      {recipes.map((recipe) => (
        <div className="card" id="recipeCard" key={recipe.id}>
          <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
            <img src={recipe?.image || ''} className="img-fluid" alt={recipe?.title || ''} />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
            </a>
          </div>
          <div className="card-body">
            <h5 className="card-title">{recipe?.title || 'No Title'}</h5>
            <p className="card-text">{recipe?.description || 'No Description'}</p>
            <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
              Button
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeCard;
