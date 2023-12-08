const db = require('../config/connection');
const { User, Family, Recipe } = require('../models');
// const userSeeds = require('./userSeeds.json');
// const familySeeds = require('./familySeeds.json');
// const recipeSeeds = require('./recipeSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Recipe', 'recipes');
    await cleanDB('User', 'users');
    await cleanDB('Family', 'families');

    const families = await Family.insertMany([
      {
        "name": "Kernighan"
      },
      {
        "name": "Kanat-Alexander"
      },
      {
        "name": "Beck"
      },
      {
        "name": "Berard"
      },
      {
        "name": "Kay"
      },
      {
        "name": "Thomas"
      },
      {
        "name": "Knuth"
      }
    ]);

    console.log('👪 families seeded 👪');

    const users = await User.insertMany([
      {
        "username": "B-King",
        "firstName": "Brian",
        "lastName": "Kernighan",
        "email": "bkernighan@techfriends.dev",
        "password": "password01",
        "families": ["Kernighan"]
      },
      {
        "username": "MaxCannotSpell",
        "firstName": "Max",
        "lastName": "Kanat-Alexander",
        "email": "mkanatalexander@techfriends.dev",
        "password": "password02",
        "families": ["Kanat-Alexander"]
      },
      {
        "username": "Barbie",
        "firstName": "Barbara",
        "lastName": "Bull",
        "email": "bbull@techfriends.dev",
        "password": "password03",
        "families": ["Bull"]
      },
      {
        "username": "Superman",
        "firstName": "Kent",
        "lastName": "Bull",
        "email": "kbull@techfriends.dev",
        "password": "password04",
        "families": ["Bull"]
      },
      {
        "username": "EVBcooks",
        "firstName": "Edward V.",
        "lastName": "Berard",
        "email": "evberard@techfriends.dev",
        "password": "password05",
        "families": ["Berard"]
      },
      {
        "username": "KissAuntKay",
        "firstName": "Alana",
        "lastName": "Kay",
        "email": "akay@techfriends.dev",
        "password": "password06",
        "families": ["Kay"]
      },
      {
        "username": "KissUncleKay",
        "firstName": "Albert",
        "lastName": "Kay",
        "email": "akay2@techfriends.dev",
        "password": "password07",
        "families": ["Kay"]
      },
      {
        "username": "D-Time",
        "firstName": "David",
        "lastName": "Thomas",
        "email": "dthomas@techfriends.dev",
        "password": "password08",
        "families": ["Thomas"]
      },
      {
        "username": "TheRealDonald",
        "firstName": "Donald",
        "lastName": "Knuth",
        "email": "dknuth@techfriends.dev",
        "password": "password09",
        "families": ["Knuth"]
      }
    ])

    await User.create(userSeeds);

    for (let i = 0; i < familySeeds.length; i++) {
      const { _id, name } = await Family.create(familySeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: name },
        {
          $addToSet: {
            families: _id,
          },
        }
      );
    }

    for (let i = 0; i < recipeSeeds.length; i++) {
      const { _id, name } = await Recipe.create(recipeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: name },
        {
          $addToSet: {
            recipes: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
