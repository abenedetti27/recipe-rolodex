import { useState, useEffect } from 'react';
import { initMDB, Ripple } from 'mdb-ui-kit';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPES } from '../utils/queries';
import { Link } from 'react-router-dom';
import './style.css';

initMDB({ Ripple });

const Search = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_RECIPES);
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter recipes based on the search term
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="md-container m-auto">
            <div className="input-group">
                <div className="form-outline" data-mdb-input-init>
                    <input type="search" id="form1" className="form-control" />
                    <label className="form-label" htmlFor="form1">Search</label>
                </div>
                <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="d-flex p-3 flex-wrap" id="cardContainer">
                {/* Search input */}


                {/* Display filtered recipes */}
                {filteredRecipes.map((recipe) => (
                    <div className="card mb-4" key={recipe._id}>
                        <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                            <img src={recipe?.photo || ''} className="img-fluid mb-0" alt={recipe?.name || ''} />
                            <a href="#!">
                                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                            </a>
                        </div>
                        <div className="card-body p-3">
                            <h5 className="card-title mb-2">{recipe?.name || 'No Title'}</h5>
                            <Link to={`/recipe/${recipe?._id}`} className="btn btn-primary" data-mdb-ripple-init>
                                See Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Search;
