import RecipeCard from '../components/RecipeCard';
import './Home.css';
import Carousels from '../components/Carousel';


function Home() {
    return (
        <section className="md-container m-auto text-center">
         <Carousels />
         <h3 className="mt-5 mb-1">✨Top Recipies✨</h3>
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
            <RecipeCard />
        </div>
        </section>
    );
}

export default Home;
