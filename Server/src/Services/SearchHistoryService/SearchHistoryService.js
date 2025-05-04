import SavedSearchModel from '../../Model/SaveSearchModel.js'
import UserModel from '../../Model/UserModel.js';

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
}

export default SearchHistoryService