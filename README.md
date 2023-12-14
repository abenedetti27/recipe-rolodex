# 📇 RECIPE ROLODEX 📇

### [View Live Project Here](https://recipe-rolodex-d7c0cb19d5d1.herokuapp.com/ "RECIPE ROLODEX")<br />
![image of RECIPE ROLODEX](/public/image/intro.gif "image of RECIPE ROLODEX")
| Technology Used    | Resource URL |
| --------  | ------- |
| NodeJS      | https://nodejs.org/en |
| Material Design for Bootstrap      | https://mdbootstrap.com/ |
| JavaScript | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| Git       | https://git-scm.com/ |
| GitHub     | https://github.com/ |
| VSCode    | https://code.visualstudio.com/ |
| Cloudinary    | https://cloudinary.com/ |
| Heroku    | https://www.heroku.com/ |
| GraphQL    | https://graphql.org/ |
| Apollo   | https://www.apollographql.com/ |
| React    | https://react.dev/ |
| Vite    | https://vitejs.dev/ |

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Authors](#authors)

## Description:
This project is a full stack project to share reciped with your family and friends. [4 authors](#authors) developed this app which allow users to see, search, upload, share and pin the recipes. User can sign up, sign in and log out from the page and some functionalities such as upload, update or pin recipes and create or join family groups are limited to signed in users.<br />
<br />

### How to use this app:

* Click on the deployed link above 'View Live Project Here'
    * See recipes in the home page
    * Navigate to search page from the nav and search by name of the recipe
    * Click on the individual recipe to see the details
    * Click on the family name to see all the recipes from the family

* Navigate to the "LOGIN" to sign up for more functionalities
    * Enter credentials
    * Navigate to the invidual recipe and pin / unpin
    * Navigate to pinned recipe page to see all the recipes you pinned
    * Go to Dashboard page from the link in the nav bar
    * Join or create a family
    * Add your recipe to your family group
    * Click SEE RECIPES of the family card to see all the recipes added to the family group
    * Update or delete your recipe from the dashboard when you need to
    * Click LOGOUT in the nav bar to log out


## Project Requirements & Expectations

```md
REQUIREMENTS:
* Must use ReactJS in some way (even if minimal)
* Must utilize at least two libraries, packages, or technologies that we haven’t discussed
* Must use a Node and Express Web Server
* Must be backed by a MongoDB Database with Mongoose ODM (Sequelize ORM - with Permission) 
* Must have both CRUD routes for creating, reading, updating, and deleting data
* Must be deployed using Heroku (with Data)
* Must utilize authentication of users using Javascript Web Token (JWT)
* Must have a polished frontend / UI
* Must have folder structure that meets MVC Paradigm
* Must meet good quality coding standards (indentation, scoping, naming)
* Incorporate GraphQL into your application
* Must utilize Git Branching / Merging. Git Branches based on Feature Built / GitHub Project Card, minimum of 30 meaningful commits per contributor.

EXPECTATIONS:
* We expect whatever you build to have utility
* We expect you to have market or real-world research that evidences your idea has REAL value to people.
* We expect you to have done research on other web / mobile applications in your domain.
* We expect you to put serious time and thought into this.
* We expect you to report problems you are facing along the way.
* We expect you to utilize some form of project management system.
* We expect you to dig deep into documentation and external resources to learn what you need.
```

### Lessons Learned

#### 1. Add a LazyQuery inside of the useEffect to run a query only in a certain condition
Author: Minami

We wanted to allow any users to see the details of the individual recipe, and when the user is already logged in, check if the user has already pinned that recipe or not to load the pin icon according to if the user has previously pinned that recipe or not. The query to get the userdata needs to run when the user is signed in. React doesn't allow the useQuery to be added inside of the if statment, such as 
```
if (loggedIn) {
    getUser({variables: { username: Auth.getProfile().authentigatedPerson.username}})
}
```
In order to achieve this without getting error returned from the server by trying to query the userdata when user is not signed in, I used `useLazyQuery` instead of `useQuery` and put the query inside of the `useEffect` I could conditionally run the query to check the userdata.
<br />

![lesson 1](https://github.com/abenedetti27/recipe-rolodex/assets/45612744/9da26f3c-75a4-430d-b649-81faac5cf5c2)

#### 2. TBD
Description
<br />

![lesson2](https://)


#### 3. TBD
Description
<br />

![lesson3](https://)

#### 4. TBD
Description
<br />

![lesson4](public/image/lesson4.png)

## Installation

1. Create a new repository on GitHub, to store this project.
2. Clone the repository to your computer.
3. Copy files to your own repository.
4. Follow the steps for "How to" above
5. Make changes to the code.
6. Commit the changes to the local repo.
7. Push the changes to the remote repo.

## Usage

This is a full stack project to share recipes with your family or community. If you would like to update and use app follow the installation steps and curate it to your needs. If you would like to use this app, follow the steps under the description 'How to' above and click the link at the top of this page.

## License

MIT License
Copyright (c) 2023 Minami Mukai (Itsukaichi) / Anna Rose / Nhi Hoang / Janet Webster

<hr />

## Authors
### Minami Mukai (Itsukaichi)
Description
- [GitHub](https://github.com/mitsukaichi/)
- [LinkedIn](https://www.linkedin.com/in/minami-itsukaichi/)

### Anna Rose
Description
- [GitHub](https://)
- [LinkedIn](https://)

### Nhi Hoang
Description
- [GitHub](https://) 
- [LinkedIn](https://) 

### Janet Webster
Full Stack MERN Software Engineer.

- [GitHub](https://github.com/TwixmixyJanet/)
- [LinkedIn](https://www.linkedin.com/in/twixmixy/)
- [Twitter](https://twitter.com/Twixmixy)
- [WakaTime](https://wakatime.com/@Twixmixy)
