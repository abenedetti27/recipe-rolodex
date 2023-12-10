import RecipeCard from '../components/RecipeCard';
import './Home.css';
import Carousels from '../components/Carousel';


function Home() {
    return (
        <section className="container m-auto">
         <Carousels />
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
            <RecipeCard />
        </div>
        </section>
    );
}

export default Home;
