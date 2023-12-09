const { User, Recipe, Family } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


 const resolvers = {
  Query: {
    recipes: async () => {
      return await Recipe.find().populate('families');
    },
    recipe: async (parent, { _id }) => {
      return await Recipe.findById(_id).populate('families');
    },

    families: async () => {
      return await Family.find();
    },
    family: async (parent, { _id }) => {
      return await Family.findById(_id);
    },

    famRecipe: async (parent, { familyId }) => {
      return await Recipe.find({ families: { _id : familyId }}).populate('families');
    },

    user: async (parent, { username }) => {

      return await User.findOne( { username: username } ).populate(['families', 'recipes']);
    },
  },


  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addFamily: async (parent, { name }) => {
      const newFamily = await Family.create({ name : name });
      return newFamily;
    },

    joinFamily: async (parent, { familyId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { families: familyId } },
          { new: true }
        ).populate('families');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    leaveFamily: async (parent, { familyId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { families: familyId } },
          { new: true }
        ).populate('families');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addRecipe: async (parent, args) => {
      const newRecipe = await Recipe.create(args);
      if (args.familyId) {
        const addRecipeToFamily = await Recipe.findByIdAndUpdate(
          { _id: newRecipe._id },
          { $addToSet: {families: args.familyId} },
          {new: true})
        return addRecipeToFamily;
      };
      return newRecipe;
    },

    updateRecipe: async (parent, { _id, name, photo, cookingTime, instructions, ingredients, servingSize, author, familyId }) => {
      const recipe = await Recipe.findByIdAndUpdate(
        { _id: _id },
        { name: name, photo: photo, cookingTime: cookingTime, instructions: instructions, ingredients: ingredients, servingSize: servingSize, author: author, families: { _id : familyId }},
        { new: true }
      ).populate('families');
      return recipe;
    },

    deleteRecipe: async (parent, { _id }) => {
      const recipe = await Recipe.findByIdAndDelete(_id);
      return recipe;
    },

    pinRecipe: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pinnedRecipes: _id } },
          { new: true }
        ).populate('pinnedRecipes');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    unpinRecipe: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { pinnedRecipes: _id } },
          { new: true }
        ).populate('pinnedRecipes');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;