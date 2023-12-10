import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPES } from '../../utils/queries';
import './style.css';

// Initialization for ES Users
import { Carousel, initMDB } from "mdb-ui-kit";

initMDB({ Carousel });

// ... (imports)

const Carousels = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_RECIPES);
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      if (data && data.recipes) {
        // Assuming data.recipes is an array of recipes
        // Reverse the array and take the last 4 items
        setRecipes(data.recipes.slice(-4).reverse());
      }
    }, [data]);
  
    if (loading) return <p>Loading...</p>;
  
    if (error) {
      console.error('Error fetching data:', error);
      return <p>Error: Unable to fetch data</p>;
    }
  
    return (
      <div className="caraBox">
{/* <!-- Carousel wrapper --> */}
<div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel" data-mdb-carousel-init>
  {/* <!-- Indicators --> */}
  <div className="carousel-indicators">
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="0"
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselBasicExample"
      data-mdb-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>


  <div className="carousel-inner">

    <div className="carousel-item active">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" className="d-block w-100" alt="Sunset Over the City"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </div>


    <div className="carousel-item">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp" className="d-block w-100" alt="Canyon at Nigh"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>


    <div className="carousel-item">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp" className="d-block w-100" alt="Cliff Above a Stormy Sea"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      </div>
    );
  };
  
  export default Carousels;
  