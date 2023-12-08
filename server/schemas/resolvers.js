const { User, Recipe, Family } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    recipies: async () => {
      return await Recipe.find();
    },
    recipe: async (parent, { _id }) => {
      return await Recipe.findById(_id).populate('family');
    },

    families: async () => {
      return await Family.find();
    },
    family: async (parent, { _id }) => {
      return await Family.findById(_id);
    },

    famRecipe: async (parent, { familyId }) => {
      return await Recipe.find({ 'families._id': familyId });
    },

    user: async (parent, { username }) => {

      return await User.findById(username).populate('families', 'recipes');
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

    addFamily: async (parent, args) => {
      const Family = await Family.create(args);
      return Family;
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
      const recipe = await Recipe.create(args);
      return recipe;
    },

    updateRecipe: async (parent, { _id, name, photo, cookingTime, instructions, ingredients, servingSize, author, familyId }) => {
      const recipe = await Recipe.findByIdAndUpdate(
        { _id: _id },
        { name: name, photo: photo, cookingTime: cookingTime, instructions: instructions, ingredients: ingredients, servingSize: servingSize, author: author, familyId: familyId },
        { new: true }
      );
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

export default resolvers;