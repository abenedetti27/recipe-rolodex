/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { initMDB, Ripple, Modal } from 'mdb-ui-kit';
import './style.css';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_FAMILY_RECIPE_PHOTOS, QUERY_FAMILY } from '../../utils/queries';
import { ADD_FAMILY, JOIN_FAMILY, LEAVE_FAMILY } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const FamilyCard = () => {
    useEffect(() => {
        initMDB({ Ripple, Modal });
    }); 
 
    const [families, setFamilies] = useState([]);
    const [newFamilyName, setNewFamilyName] = useState('');
    const [searchFamilyId, setSearchFamilyId] = useState('');
    const [createNewFamily]  = useMutation(ADD_FAMILY);
    const [findFamily] = useLazyQuery(QUERY_FAMILY);
    const [joinFamily] = useMutation(JOIN_FAMILY);
    const [leaveFamily] = useMutation(LEAVE_FAMILY);
    const [searchResult, setSearchResult] = useState('');

    const { loading, error, data } = useQuery(QUERY_FAMILY_RECIPE_PHOTOS, {
        variables: { username: Auth.getProfile().authenticatedPerson.username }
    });

    useEffect(() => {
        if (data){
            setFamilies(data.familyRecipePhotos)
        }
    }, [data, loading, error]);

    if (loading ) return <p>Loading...</p>;

    if (error) {
        console.error('Error fetching data:', error);
        return <p>Error: Unable to fetch data</p>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if ( name === "family_name") { 
            setNewFamilyName(value);
        } else if ( name === "search-family-by-id"){
            setSearchFamilyId(value);
        }

        if (value.trim() !== '') {
            event.target.classList.add('active');
          } else {
            event.target.classList.remove('active');
        } 
    }

    const submitNewFamily = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createNewFamily({
                variables: {name: newFamilyName},
            });
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const searchFamily = async (event) => {
        event.preventDefault();
        try {
            const { data } = await findFamily({
                variables: { id : searchFamilyId}
            });
            setSearchResult(data.family);
        } catch (error) {
            console.log(error);
        }
    }

    const handleJoinFamily = async (event) => {
        event.preventDefault();
        try {
            const { data } = await joinFamily({
                variables: { familyId: searchResult._id}
            });
            location.reload();
        } catch ( error ) {
            console.log(error);
        }
    }

    const handleLeaveFamily = async (event) => {
        event.preventDefault();
        try {
            const { data } = await leaveFamily({
                variables: { familyId: event.target.id }
            });
            location.reload();
        } catch ( error ) {
            console.log(error);
        }
    }

    const tabChangeHandler = async (e) => {
        if (e.target.id == "mdb-tab-search-family") {
            document.getElementById("mdb-tab-search-family").classList.add("active");
            document.getElementById("pills-search-family").classList.add("active", "show");
            document.getElementById("mdb-tab-create-family").classList.remove("active");
            document.getElementById("pills-create-family").classList.remove("active", "show");
            setNewFamilyName('');
            
        } else if (e.target.id == "mdb-tab-create-family") {
            document.getElementById("mdb-tab-create-family").classList.add("active");
            document.getElementById("pills-create-family").classList.add("active", "show");
            document.getElementById("mdb-tab-search-family").classList.remove("active");
            document.getElementById("pills-search-family").classList.remove("active", "show");
            setSearchFamilyId('');
        }     
    }

    return (
        <>
        <section className="container m-auto justify-content-between d-flex flex-wrap">
            <h2>Your Family Group</h2>
            <div>
                <button type="button" className="btn btn-primary" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#open-family-modal">Join or create family</button>
            </div>
        </section>
        <section className="container m-auto d-flex ">
            {families.length !== 0 ? 
                <div className="d-flex p-3 flex-wrap" id="cardContainer">
                    {families.map((family) => (
                        <div className="card mb-4 m-2 flex-shrink-0" key={family.familyId}>
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
                                    <Link to={`/familyrecipes/${family.familyId}`} className="btn btn-primary" data-mdb-ripple-init>
                                    See Recipes
                                    </Link>
                                </div>
                                <button type="submit" className="btn btn-danger btn-block mb-4 mt-4" data-mdb-ripple-init="" onClick={handleLeaveFamily} id={family.familyId}>Leave this family</button>
                            </div>
                        </div>
                    ))} 
                </div>
            : <p>You are not a member of any family group yet</p> }
        </section>
        <div className="modal fade" tabIndex="-1" id="open-family-modal" aria-modal="true" role="dialog" data-mdb-modal-initialized display="block" >
            <div className="modal-dialog modal-lg">
                <div className="modal-content"> 
                    <div className="modal-body p-4">
                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation" onClick={tabChangeHandler}>
                                <a className="nav-link active"  data-mdb-pill-init="" href="#pills-create-family" role="tab" aria-controls="pills-create-family" aria-selected="true" data-mdb-tab-initialized="true" id="mdb-tab-create-family">Create family</a>
                            </li>
                            <li className="nav-item" role="presentation" onClick={tabChangeHandler} >
                                <a className="nav-link"  data-mdb-pill-init="" href="#pills-search-family" role="tab" aria-controls="pills-search-family" aria-selected="false" data-mdb-tab-initialized="true" tabIndex="-1" id="mdb-tab-search-family">Search family</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                        <div className="tab-pane fade active show" id="pills-create-family" role="tabpanel" aria-labelledby="mdb-tab-create-family">
                            <form>
                            <div className="form-outline mb-4">
                                <input type="family_name" id="family_name" name="family_name" className="form-control"  value={newFamilyName} onChange={handleChange}/>
                                <label className="form-label" htmlFor="family_name">Name of the new family group</label>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4" data-mdb-ripple-init="" onClick={submitNewFamily}>Submit</button>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="pills-search-family" role="tabpanel" aria-labelledby="mdb-search-family">
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="text" id="search-family-by-id" name="search-family-by-id" className="form-control" value={searchFamilyId}  onChange={handleChange}/>
                                    <label className="form-label" htmlFor="search-family-by-id">Family ID</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-1" data-mdb-ripple-init="" onClick={searchFamily}>Search</button>
                                <div>{searchResult !== "" ? 
                                    <div>
                                        <div>
                                            <h5>Search result</h5>
                                            <div className="text-center">ID: {searchResult._id} <br/>
                                                Name of the family: {searchResult.name}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-info btn-block mb-1" data-mdb-ripple-init="" onClick={handleJoinFamily}>Join this family</button>
                                    </div>
                                        : ""}
                                </div>
                            </form>
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default FamilyCard;
