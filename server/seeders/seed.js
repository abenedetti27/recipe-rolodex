const db = require('../config/connection');
const { User, Family, Recipe } = require('../models');
const userSeeds = require('./userSeeds.json');
const familySeeds = require('./familySeeds.json');
const recipeSeeds = require('./recipeSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Recipe', 'recipes');

    await cleanDB('Family', 'families');
    
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < familySeeds.length; i++) {
      const { _id, name } = await Family.create(familySeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: name },
        {
          $addToSet: {
            thoughts: _id,
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
