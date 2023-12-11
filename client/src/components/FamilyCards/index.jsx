import { useState, useEffect } from 'react';
import { initMDB, Ripple, Modal } from 'mdb-ui-kit';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_FAMILY_RECIPE_PHOTOS } from '../../utils/queries';
// import { ADD_FAMILY, JOIN_FAMILY } from '../../utils/mutations';
import Auth from '../../utils/auth';

initMDB({ Ripple, Modal });

const FamilyCard = () => {
    const [families, setFamilies] = useState([]);

    // const { loading, error, data } = useQuery(QUERY_FAMILY_RECIPE_PHOTOS, {
    //     variables: { username: Auth.getProfile().authenticatedPerson.username }
    // });

    // useEffect(() => {
    //     setFamilies(data.familyRecipePhotos)
    // }, [data]);

    // if (loading ) return <p>Loading...</p>;

    // if (error) {
    //     console.error('Error fetching data:', error);
    //     return <p>Error: Unable to fetch data</p>;
    // }
    useEffect(() => {
    setFamilies([{name: "testfamily", familyId: 12345, photos: ["https://github.com/abenedetti27/recipe-rolodex/assets/117195025/36621a27-f49d-4db4-b2dd-b31768211721"]}])
    }, []);

    const tabChangeHandler = async (e) => {
        console.log(e.tagert.id);
    }

    return (
        <>
        <section className="container m-auto justify-content-between d-flex">
            <h2>Your Family Group</h2>
            <div>
                <button type="button" className="btn btn-primary" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#open-family-modal">Join or create family</button>
            </div>
        </section>
        <section className="container m-auto">
            {families.length !== 0 ? 
                <div className="d-flex p-3 flex-wrap" id="cardContainer">
                    {families.map((family) => (
                        <div className="card" id="recipeCard" key={family.familyId}>
                            {family.photos.length !== 0 ?
                            <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                                <img src={family?.photos[Math.floor(Math.random() * families.length)] || ''} className="img-fluid" alt={family?.name || ''} />
                                <a href="#!">
                                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                                </a>
                            </div>
                            : <div></div>}
                            <div className="card-body">
                                <h5 className="card-title">{family?.name || 'No Title'}</h5>
                                <p className="card-text">ID: {family?.familyId || ''}</p>
                                <div>
                                    <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
                                    See the recipes
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            : <p>You are not a member of any family gruop yet</p> }
        </section>
        <section>
        <div className="modal fade" tabIndex="-1" id="open-family-modal" display="inherit">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-body p-4">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation" id="mdb-tab-create-family">
                            <a className="nav-link"  data-mdb-pill-init="" href="#pills-create-family" role="tab" aria-controls="pills-create-family" aria-selected="true" data-mdb-tab-initialized="true">Create family</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="mdb-tab-search-family" data-mdb-pill-init="" href="#pills-search-family" role="tab" aria-controls="pills-search-family" aria-selected="false" data-mdb-tab-initialized="true" tabIndex="-1">Search family</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                    <div className="tab-pane fade" id="pills-create-family" role="tabpanel" aria-labelledby="mdb-tab-create-family">
                        <form>
                        <div className="form-outline mb-4">
                            <input type="family_name" id="family_name" className="form-control"/>
                            <label className="form-label" htmlFor="family_name">Name of the family group</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4" data-mdb-ripple-init="">Submit</button>
                        </form>
                    </div>
                    <div className="tab-pane fade  active show" id="pills-search-family" role="tabpanel" aria-labelledby="mdb-search-family">
                        <form>
                        <div className="form-outline mb-4">
                            <input type="text" id="search-family-by-id" className="form-control"/>
                            <label className="form-label" htmlFor="search-family-by-id">Family ID</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-1" data-mdb-ripple-init="">Search</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
        </>
    );
};

export default FamilyCard;
