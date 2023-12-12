import { Input, Ripple, initMDB } from "mdb-ui-kit";
import './style.css';
import { useQuery } from '@apollo/client';
// import Auth from '../../utils/auth';

import { QUERY_USER } from "../../utils/queries";

initMDB({ Input, Ripple });



export default function RecipeForm() {
  const username = 'B-King';
  // Update the variables below to be authorized user's username when we get there.
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: username }, //Auth.getProfile().authenticatedPerson.username
  });

  const user = data?.user || {};
  const families = user.families || [];

    return (
        <form className="me-2">
        <div className="row m-2">
          <div data-mdb-input-init className="form-outline m-2">
            <input type="text" id="recipeName" className="form-control" />
            <label className="form-label" htmlFor="recipeName">Recipe Name</label>
          </div>
        
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input type="number" id="cookingTime" className="form-control" />
              <label className="form-label" htmlFor="cookingTime">Cooking Time</label>
              <sub className="text-muted m-1">in minutes</sub>
            </div>
          </div>
  
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input type="number" id="servingSize" className="form-control" />
              <label className="form-label" htmlFor="servingSize">Serving Size</label>
              <sub className="text-muted m-1">in people</sub>
            </div>
          </div>
      
          <div data-mdb-input-init className="form-outline m-2">
            <textarea className="form-control" id="instructions" rows="4"></textarea>
            <label className="form-label" htmlFor="instructions">Cooking Instructions</label>
            <sub className="text-muted m-1">Separate each step with a new line</sub>
          </div>
  
          <div data-mdb-input-init className="form-outline m-2">
            <textarea className="form-control" id="ingredients" rows="4"></textarea>
            <label className="form-label" htmlFor="ingredients">Ingredients</label>
            <sub className="text-muted m-1">Separate each ingredient with a new line</sub>
          </div>
  
          <div data-mdb-input-init className="form-outline m-4 row">
            <label className="visually-hidden" htmlFor="families">Family</label>
            <select data-mdb-select-init className="select">
              <option value="" disabled selected>Choose a family</option>
              {loading ? (
                <div>Loading...</div>
              ) : (
                families.map((family) => (
                  <option key={family._id} value={family._id}>
                    {family.familyName}
                  </option>
                ))
              )}
            </select>
            <sub className="text-muted mt-2">Select a family to share this recipe</sub>
          </div>
        
          <div data-mdb-input-init className="form-outline m-4 row">
            <button type="button" className="btn btn-info btn-sm btn-rounded">Upload Image  <i className="bi bi-camera-fill"></i></button>
            <sub className="text-muted mt-2">Upload a picture of your recipe</sub>
          </div>
      
          <button data-mdb-ripple-init type="button" className="btn btn-success btn-block btn-lg m-4 submit">Submit Recipe</button>
        </div>
      </form>
    );
}