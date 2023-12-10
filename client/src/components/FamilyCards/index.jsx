import { useState, useEffect } from 'react';
import { initMDB, Ripple } from 'mdb-ui-kit';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_FAMILY_RECIPE_PHOTOS } from '../../utils/queries';
import { ADD_FAMILY, JOIN_FAMILY } from '../../utils/mutations';
import Auth from '../../utils/auth';

initMDB({ Ripple });

const FamilyCard = () => {
    const [families, setFamilies] = useState([]);

    const { loading, error, data } = useQuery(QUERY_FAMILY_RECIPE_PHOTOS, {
        variables: { username: Auth.getProfile().authenticatedPerson.username }
    })

    useEffect(() => {
        setFamilies(data.familyRecipePhotos)
    }, [data]);

    if (loading ) return <p>Loading...</p>;

    if (error) {
        console.error('Error fetching data:', error);
        return <p>Error: Unable to fetch data</p>;
    }

    return (
        <>
        <h2>Your Family Group</h2>
        {families.map((family) => (
            <div className="card" id="recipeCard" key={family.familyId}>
            <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                <img src={family?.phoots[Math.floor(Math.random() * family.length)] || ''} className="img-fluid" alt={recipe?.title || ''} />
                <a href="#!">
                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                </a>
            </div>
            <div className="card-body">
                <h5 className="card-title">{family?.name || 'No Title'}</h5>
                <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
                See the recipe of this family
                </a>
            </div>
            </div>
        ))}
        </>
    );
    };

export default FamilyCard;
