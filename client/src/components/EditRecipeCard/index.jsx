import { useState, useEffect } from 'react';
import { initMDB, Ripple } from 'mdb-ui-kit';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPES } from '../../utils/queries';
import './style.css';

initMDB({ Ripple });

const EditRecipeCard = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_RECIPES);
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

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

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleCancelEdit = () => {
    setEditingRecipe(null);
  };

  const handleSaveEdit = () => {
    // how do we save the edit?
    try {
        const [updateRecipe, { error }] = useMutation(UPDATE_RECIPE);
        await updateRecipe({
            variables: {
                _id: editingRecipe._id,
                name: editingRecipe.name,
                photo: editingRecipe.photo,
                ingredients: editingRecipe.ingredients,
                instructions: editingRecipe.instructions,
                category: editingRecipe.category,
                description: editingRecipe.description,
            },
            });
    
    setEditingRecipe(null);
    refectch();
  } catch (err) {
    console.error('Error saving edit:', error);
  }
}

  return (
    <>
      {recipes.map((recipe) => (
        <div className="card mb-4" key={recipe._id}>
          <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
            <img src={recipe?.photo || ''} className="img-fluid mb-0" alt={recipe?.name || ''} />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
            </a>
          </div>
          <div className="card-body p-3">
            <h5 className="card-title mb-2">{recipe?.name || 'No Title'}</h5>
            {editingRecipe === recipe ? (
              <>
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Save Edit
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => handleEditClick(recipe)}
                data-mdb-ripple-init
              >
                Edit Recipe
              </button>
            )}
            <button className="btn btn-primary" data-mdb-ripple-init>
              See Recipe
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default EditRecipeCard;
