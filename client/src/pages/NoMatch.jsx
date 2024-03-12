import "./style.css";
import { Link, useNavigate } from "react-router-dom";

export default function NoMatch() {
  const navigate = useNavigate();
  const handleReturnToRecipes = () => {
    // Use the navigate function to navigate back
    navigate(-1); // This is equivalent to navigating back one step
  };

  return (
    <div className="error-404">
      {" "}
      {/* Add a container with a class */}
      <h1>404 Not Found</h1>
      <img
        src="https://media0.giphy.com/media/ltc9ByyewOHyargNAs/giphy.gif?cid=6c09b952xwaxumzvqkkg1runakxuo38gcq8aq3btdgjhfgzx&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=v"
        alt="404 Not Found"
      />
      <p>Sorry this page cannot be found!</p>
      <Link to="/">
        <div
          className="badge bg-secondary return-to-recipes"
          onClick={handleReturnToRecipes}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-arrow-left-long"></i> Return to Previous Page
        </div>
      </Link>
    </div>
  );
}
