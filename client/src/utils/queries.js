// Important for useQuery: We bring in gql from the @apollo/client library to allow us to parse queries (and mutations) as template literals
import { gql } from '@apollo/client';

// Important for useQuery: Each query we'd like to be able to perform gets exported out of our queries.js utility

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            firstName
            lastName
            username
            email
            families {
                _id
                name
            } 
            recipes {
                _id
                name
                photo
                cookingTime
                instructions
                ingredients
                servingSize
                author
                createdAt
                families {
                    _id
                    name
                }
            }
            pinnedRecipes  {
                _id
                name
                photo
                cookingTime
                instructions
                ingredients
                servingSize
                author
                createdAt
                families {
                    _id
                    name
                }
            }
    }
`;

export const QUERY_ALL_RECIPES = gql`
    query getRecipes {
        recipes  {
            _id
            name
            photo
            cookingTime
            instructions
            ingredients
            servingSize
            author
            createdAt
            families {
                _id
                name
            }
        }
    }
`
export const QUERY_RECIPE = gql`
    query getSingleRecipe($recipeId: ID!) {
        recipe(recipeId: $recipeId){
            _id
            name
            photo
            cookingTime
            instructions
            ingredients
            servingSize
            author
            createdAt
            families {
                _id
                name
            }
        }
    }
`

export const QUERY_ALL_FAMILIES = gql`
    query getFamilies {
        families  {
            _id
        }
    }
`

export const QUERY_FAMILY = gql`
    query getSingleFamily($familyId: ID!) {
        family(familyId: $familyId) {
            _id
            name
        }
    }
`

export const QUERY_FAMILY_RECIPE = gql`
    query getFamilyRecipes($familyId: ID!) {
        recipes(familyId: $familyId) {
            _id
            name
            photo
            cookingTime
            instructions
            ingredients
            servingSize
            author
            createdAt
            families {
                _id
                name
            } 
        }
    }
`
