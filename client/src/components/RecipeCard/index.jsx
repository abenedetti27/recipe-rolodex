import { initMDB } from "mdb-ui-kit";
import './style.css';

initMDB();

export default function RecipeCard() {
  return (
    <section id="cardContainer">
      <div className="card" id="recipeCard">
        <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
          <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid" alt="Nature" />
          <a href="#!">
            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
        </div>
      </div>

      <div className="card" id="recipeCard">
        <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
          <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid" alt="Nature" />
          <a href="#!">
            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
        </div>
      </div>

      <div className="card" id="recipeCard">
        <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
          <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid" alt="Nature" />
          <a href="#!">
            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Button</a>
        </div>
      </div>
    </section>
  );
}
