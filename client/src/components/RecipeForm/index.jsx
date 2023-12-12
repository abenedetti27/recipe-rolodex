import { Input, Ripple, initMDB } from "mdb-ui-kit";
import "./style.css";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from 'react';
import Auth from '../../utils/auth';

import { QUERY_USER } from "../../utils/queries";
import { ADD_RECIPE } from "../../utils/mutations";

initMDB({ Input, Ripple });



export default function RecipeForm() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [myImage, setMyImage] = useState();
  const [userFamlies, setUserFamilies] = useState([]);

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

  const [addRecipe] = useMutation(ADD_RECIPE);

  // const username = "B-King";
  const username = Auth.getProfile().authenticatedPerson.username
  // Update the variables below to be authorized user's username when we get there.
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: username }, 
  });



  const [formData, setFormData] = useState({
    name: "",
    cookingTime: 0,
    servingSize: 0,
    instructions: "",
    ingredients: "",
    familyId: "", // The selected family id
  });

  const handleSubmit = async () => {
    try {
      console.log( "formData: ", formData);
      console.log( "myImage: ", myImage);
      console.log( "username: ", username);
      const { name, cookingTime, instructions, ingredients, servingSize, familyId } = formData
      const { data } = await addRecipe({
        variables: {
          name: name,
          cookingTime: cookingTime,
          instructions: instructions,
          ingredients: ingredients,
          servingSize: servingSize,
          familyId: "6578c17e1908386bad1c10e4",
          photo: myImage,
          author: username
        }, 
        // refetchQueries: [{ query: QUERY_USER, variables: { username } }],
      });

      console.log(data);
      


      // Optionally, reset the form after successful submission
      setFormData({
        name: "",
        cookingTime: 0,
        servingSize: 0,
        instructions: "",
        ingredients: "",
        familyId: "",
      });
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  // const handleFamilyChange = (e) => {
  //   setFormData({ ...formData, familyId: e.target.value });
  // };



  useEffect(() => {
    if (data) {
      setUserFamilies(data.user.families);
    }
  }, [data, loading]);


  const handleUpload = (event) => {
    event.preventDefault();
    // This is to prevent the page from reloading when someone clicks the button to upload a picture
  };

  return (
    <form className="me-2">
      <div className="row m-2">
        <div data-mdb-input-init className="form-outline m-2">
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

        <div className="col">
          <div data-mdb-input-init className="form-outline">
            <input
              type="number"
              id="cookingTime"
              className="form-control"
              value={formData.cookingTime}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="cookingTime">
              Cooking Time
            </label>
            <sub className="text-muted m-1">in minutes</sub>
          </div>
        </div>

        <div className="col">
          <div data-mdb-input-init className="form-outline">
            <input
              type="number"
              id="servingSize"
              className="form-control"
              value={formData.servingSize}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="servingSize">
              Serving Size
            </label>
            <sub className="text-muted m-1">in people</sub>
          </div>
        </div>

        <div data-mdb-input-init className="form-outline m-2">
          <textarea
            className="form-control"
            id="instructions"
            rows="4"
            value={formData.instructions}
            onChange={handleInputChange}
          ></textarea>
          <label className="form-label" htmlFor="instructions">
            Cooking Instructions
          </label>
          <sub className="text-muted m-1">
            Separate each step with a new line
          </sub>
        </div>

        <div data-mdb-input-init className="form-outline m-2">
          <textarea
            className="form-control"
            id="ingredients"
            rows="4"
            value={formData.ingredients}
            onChange={handleInputChange}
          ></textarea>
          <label className="form-label" htmlFor="ingredients">
            Ingredients
          </label>
          <sub className="text-muted m-1">
            Separate each ingredient with a new line
          </sub>
        </div>

        <div data-mdb-input-init className="form-outline m-4 row">
          <label className="visually-hidden" htmlFor="families">
            Family
          </label>
          <select
            data-mdb-select-init
            className="select"
            id="familyId"
            value={formData.familyId}
            onChange={handleInputChange}
          >
            <option defaultValue="" disabled selected>
              Choose a family
            </option>
            {loading ? (
              <div>Loading...</div>
            ) : (
              userFamlies.map((family) => (
                <option key={family._id} value={family._id}>
                  {family.name}
                </option>
              ))
            )}
          </select>
          <sub className="text-muted mt-2">
            Select a family to share this recipe
          </sub>
        </div>

        <div
          data-mdb-input-init
          className="form-outline m-4 row"
          onClick={handleUpload}
        >
        <section>
          <div>
              <img className="uploaded-image-cloudinary" src={myImage}/>
          </div>
          <div>
              <button onClick={() => widgetRef.current.open()}>Upload Image</button>
          </div>
        </section>
          <sub className="text-muted mt-2">Upload a picture of your recipe</sub>
        </div>

        <button
          data-mdb-ripple-init
          type="button"
          className="btn btn-success btn-block btn-lg m-4 submit"
          onClick={handleSubmit}
        >
          Submit Recipe
        </button>
      </div>
    </form>
  );
}
