import { Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Ripple });

import RecipeCard from "../components/RecipeCard";
import FamilyCards from "../components/FamilyCards";
import "./Home.css";

function Dashboard() {
  return (
    <>
      <section className="md-container m-auto" id="dashboard-families">
      <div className="p-3">
            <button className="btn btn-success">Add New Family</button> 
        </div>
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
          <FamilyCards />
        </div>
      </section>
      <section className="md-container m-auto" id="dashboard-recipes">
      <div className="p-3">
            <button className="btn btn-success">Add New Recipe</button> 
        </div>
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
          <RecipeCard />
        </div>
      </section>
    </>
  );
}

export default Dashboard;