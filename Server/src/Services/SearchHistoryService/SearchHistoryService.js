import SavedSearchModel from "../../Model/SaveSearchModel.js";
import UserModel from "../../Model/UserModel.js";

const SearchHistoryService = {
  saveSearchHistory: async (req) => {
    try {
      const userId = req.session.user.id;
      const { query } = req.body;
      // check if user exists
      const checkUser = await UserModel.findByPk(userId);
      if (!checkUser) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      // save search history
      const searchHistory = await SavedSearchModel.create({
        query,
        userId,
      });
      return searchHistory;
    } catch (error) {
      throw error;
    }
  },

  getAllSearchHistory: async (req) => {
    try {
      const userId = req.session.user.id;
      // check if user exists
      const checkUser = await UserModel.findByPk(userId);
      if (!checkUser) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      const searchHistory = await SavedSearchModel.findAll({
        where: { userId },
      });
      return searchHistory;
    } catch (error) {
      throw error;
    }
  },

  getSingleSearchHistory: async (req, searchId) => {
    try {
      const userId = req.session.user.id;
      // check if user exists
      const checkUser = await UserModel.findByPk(userId);
      if (!checkUser) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      const search = await SavedSearchModel.findOne({
        where: {
          id: searchId,
          userId,
        },
      });
      if (!search) {
        const error = new Error("No such history exist");
        error.status = 404;
        throw error;
      }
      return search;
    } catch (error) {
      throw error;
    }
  },
};

export default SearchHistoryService;
