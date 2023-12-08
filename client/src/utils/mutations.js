// Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from '@apollo/client';

// Important for useMutation: Each mutation we'd like to be able to perform gets exported out of our mutations.js utility

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const ADD_FAMILY = gql`
    mutation addFamily($name: String!) {
        addFamily(name: $name) {
            _id
            name   
        }
    }
`

export const JOIN_FAMILY = gql`
    mutation joinFamily($username: String!, $familyId: ID! ) {
        joinFamily(user: $username, familyID: $familyId) {
            _id
            name   
        }
    }
`

export const LEAVE_FAMILY = gql`
    mutation leaveFamily($username: String!, $familyId: ID! ) {
        leaveFamily(user: $username, familyID: $familyId) {
            _id
            name   
        }
    }
`

export const ADD_RECIPE = gql`
    mutation addRecipe(name:  String!, photo: String, cookingTime: Int, instructions: String, ingredients: Int, servingSize: Int, author: String, familyId: ID! ) {
        addRecipe(name: $name, photo: $photo, cookingTime: $cookingTime, instructions: $instructions, ingredients: $ingredients, servingSize: $servingSize, author: $author, familyID: $familyId) {
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

export const UPDATE_RECIPE = gql`
    mutation addRecipe(recipeId: ID!, name: String!, photo: String, cookingTime: Int, instructions: String, ingredients: Int, servingSize: Int, author: String, familyId: ID! ) {
        addRecipe(recipeId: $recipeId, name: $name, photo: $photo, cookingTime: $cookingTime, instructions: $instructions, ingredients: $ingredients, servingSize: $servingSize, author: $author, familyID: $familyId) {
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

export const DELETE_RECIPE = gql`
    mutation deleteRecipe($recipeId: ID! ) {
        leaveFamily(recipeId: $recipeId) {
            _id
            name   
        }
    }
`
export const PIN_RECIPE = gql`
    mutation pinRecipe($username: String!, $recipeId: ID!) {
        pinRecipe(username: $username, recipeId: $recipeId) {
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
    }
`
export const UNPIN_RECIPE = gql`
    mutation unpinRecipe($username: String!, $recipeId: ID!) {
        unpinRecipe(username: $username, recipeId: $recipeId) {
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
    }
`