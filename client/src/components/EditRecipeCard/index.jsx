import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../../utils/auth';

import { QUERY_USER, QUERY_RECIPE } from "../../utils/queries";
import { UPDATE_RECIPE } from "../../utils/mutations";

initMDB({ Input, Ripple });

export default function RecipeForm() {
  const { id: recipeId } = useParams();
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [myImage, setMyImage] = useState();
  const [userFamlies, setUserFamilies] = useState([]);
  const [uploadError, setuploadError] = useState("");

  const { loading, data, error } = useQuery(QUERY_RECIPE, {
    variables: { id: recipeId },
  });

  useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
          cloudName: 'defuryakl',
          uploadPreset: 'reciperolodex',
      }, function(error, result) {
          if (result && result.info && result.info.secure_url) {
              setMyImage(result.info.secure_url);
          }
      });
  }, []);

  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  // const username = "B-King";
  const username = Auth.getProfile().authenticatedPerson.username
  // Update the variables below to be authorized user's username when we get there.
  const { data: userData } = useQuery(QUERY_USER, {
    variables: { username: username }, 
  });

  const [formData, setFormData] = useState({
    name: "",
    cookingTime: "",
    servingSize: "",
    instructions: "",
    ingredients: "",
    familyId: "", // The selected family id
  });

  const handleSubmit = async () => {
    try {
      console.log( "formData: ", formData);
      console.log( "myImage: ", myImage);
      console.log( "username: ", username);
      const { name, cookingTime, instructions, ingredients, servingSize, familyId } = formData;
      
      // Use updateRecipe mutation instead of addRecipe
      const { data, error } = await updateRecipe({
        variables: {
          // Include recipe ID in the variables
          id: recipeId,
          name: name,
          cookingTime: cookingTime,
          instructions: instructions,
          ingredients: ingredients,
          servingSize: servingSize,
          familyId: familyId,
          photo: myImage,
          author: username
        },
        // refetchQueries: [{ query: QUERY_RECIPE, variables: { username } }],
      });
      console.log("data: ", data);

      if( data ){
        window.location.replace(window.location.origin + "/dashboard");
      }

      if( error ){
        setuploadError("something went wrong, please try again")
      }

    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    const inputElement = e.target;
    if (value.trim() !== '') {
      inputElement.classList.add('active');
    } else {
      inputElement.classList.remove('active');
    }
    console.log(formData);
  };

  const handleFamilyChange = (e) => {
    setFormData({ ...formData, familyId: e.target.value });
    
  };

  useEffect(() => {
    if (userData) {
      setUserFamilies(userData.user.families);
    }
  }, [userData]);

  useEffect(() => {
    if (data && data.recipe) {
      // Set initial state using data
      setFormData({
        name: data.recipe.name || "",
        cookingTime: data.recipe.cookingTime || "",
        servingSize: data.recipe.servingSize || "",
        instructions: data.recipe.instructions || "",
        ingredients: data.recipe.ingredients || "",
        familyId: data.recipe.families._id || "",
      });

      setMyImage(data.recipe.photo || ""); // Set image if available
    }

    document.querySelectorAll('input').forEach((input) => {
        input.classList.add('active');
    });

    document.querySelectorAll('textarea').forEach((textarea) => {
      textarea.classList.add('active');
  });

  }, [data]);

  

  const handleUpload = (event) => {
    event.preventDefault();
    // This is to prevent the page from reloading when someone clicks the button to upload a picture
  };

  useEffect(() => {
    // Initialize MDB UI Kit components after the component has loaded
    document.querySelectorAll('form-outline').forEach((formOutline) => {
      if (formOutline && formOutline.classList) {
        try {
          new Input(formOutline).update();
        } catch (error) {
          console.error('Error updating Input:', error);
        }
      }
    }
    );
  }, []);
  

  return (
    <form className="mb-5">
       <div className="col m-auto">
      <div className="col-5">
      <div data-mdb-input-init className="form-outline mb-3">
          <input
            type="text"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label className="form-label" htmlFor="name">
            Recipe Name
          </label>
        </div>
        </div>

        <div className="col-5 p-0">
          <div data-mdb-input-init className="form-outline mb-3">
            <input
              type="number"
              id="cookingTime"
              placeholder="0"
              className="form-control"
              value={formData.cookingTime}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="cookingTime">
              Cooking Time (In Minutes)
            </label>
          </div>
        </div>

        <div className="col-5 p-0">
          <div data-mdb-input-init className="form-outline mb-3">
            <input
              type="number"
              id="servingSize"
              className="form-control"
              placeholder="0"
              value={formData.servingSize}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="servingSize">
              Serving Size (Number of People)
            </label>
          </div>
        </div>

        <div data-mdb-input-init className="form-outline mb-3">
          <textarea
            className="form-control"
            id="instructions"
            rows="4"
            value={formData.instructions}
            onChange={handleInputChange}
          ></textarea>
          <label className="form-label" htmlFor="instructions">
            Cooking Instructions (Separate each step with a new line)
          </label>
        </div>

        <div data-mdb-input-init className="form-outline mb-3">
          <textarea
            className="form-control"
            id="ingredients"
            rows="4"
            value={formData.ingredients}
            onChange={handleInputChange}
          ></textarea>
          <label className="form-label" htmlFor="ingredients">
            Ingredients (Separate each ingredient with a new line)
          </label>
        </div>

        <div data-mdb-input-init className="form-outline m-auto row">
          <label className="visually-hidden" >
            Family
          </label>
          <select
            data-mdb-select-init
            className="select"
            id="familyId"
            placeholder="Select a family to share this recipe"
            value={formData.familyId}
            onChange={handleFamilyChange}
          >
            {loading ? (
              <option defaultValue="" disabled className="optColor">
              Join or create family to upload a new recipe
              </option>
            ) : (
              <>
                <option defaultValue="" selected className="optColor">
                Choose a family (Select a family to share this recipe)
                </option>
                {userFamlies.map((family) => (
                  <option key={family._id} value={family._id} className="optColor">
                    {family.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div
          data-mdb-input-init
          className="form-outline mt-4 m-auto row"
          onClick={handleUpload}
        >
        <section>
          <div >
              <img className="uploaded-image-cloudinary" src={myImage} id="cloudBox"/>
          </div>
          <div className="m-auto">
              <button className="" onClick={() => widgetRef.current.open()}>Upload Image</button>
          </div>
        </section>
          <sub className="text-muted m-auto mt-2">Upload a picture of your recipe</sub>
        </div>

        <button
          data-mdb-ripple-init
          type="button"
          className="btn btn-block btn-lg m-auto mt-4 submit"
          onClick={handleSubmit}
        >
          Update Recipe
        </button>
      </div>
      <h4 className="text-center" style={{color: "red"}}>{uploadError}</h4>
    </form>
  );
}
