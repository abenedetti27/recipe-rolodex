import { Input, Ripple, initMDB } from "mdb-ui-kit";
import './style.css';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

import { QUERY_FAMILY, QUERY_USER } from "../../utils/queries";

initMDB({ Input, Ripple });

export default function RecipeForm() {
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().authenticatedPerson.username },
  });

  const user = data?.user || {};
  const families = user.families || [];

    return (
        <form class="me-2">
        <div class="row m-2">
          <div data-mdb-input-init class="form-outline m-2">
            <input type="text" id="recipeName" class="form-control" />
            <label class="form-label" for="recipeName">Recipe Name</label>
          </div>
        
          <div class="col">
            <div data-mdb-input-init class="form-outline">
              <input type="number" id="cookingTime" class="form-control" />
              <label class="form-label" for="cookingTime">Cooking Time</label>
              <sub class="text-muted m-1">in minutes</sub>
            </div>
          </div>
  
          <div class="col">
            <div data-mdb-input-init class="form-outline">
              <input type="number" id="servingSize" class="form-control" />
              <label class="form-label" for="servingSize">Serving Size</label>
              <sub class="text-muted m-1">in people</sub>
            </div>
          </div>
      
          <div data-mdb-input-init class="form-outline m-2">
            <textarea class="form-control" id="instructions" rows="4"></textarea>
            <label class="form-label" for="instructions">Cooking Instructions</label>
            <sub class="text-muted m-1">Separate each step with a new line</sub>
          </div>
  
          <div data-mdb-input-init class="form-outline m-2">
            <textarea class="form-control" id="ingredients" rows="4"></textarea>
            <label class="form-label" for="ingredients">Ingredients</label>
            <sub class="text-muted m-1">Separate each ingredient with a new line</sub>
          </div>
  
          <div data-mdb-input-init class="form-outline m-4 row">
            <label class="visually-hidden" for="families">Family</label>
            <select data-mdb-select-init class="select">
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
            <sub class="text-muted mt-2">Select a family to share this recipe</sub>
          </div>
        
          <div data-mdb-input-init class="form-outline m-4 row">
            <button type="button" class="btn btn-info btn-sm btn-rounded">Upload Image  <i class="bi bi-camera-fill"></i></button>
            <sub class="text-muted mt-2">Upload a picture of your recipe</sub>
          </div>
      
          <button data-mdb-ripple-init type="button" class="btn btn-success btn-block btn-lg m-4 submit">Submit Recipe</button>
        </div>
      </form>
    );
}