import SearchHistoryService from "../../Services/SearchHistoryService/SearchHistoryService.js";

const SearchHistoryController = {
  saveSearchHistory: async (req, res) => {
    try {
      const searchHistory = await SearchHistoryService.saveSearchHistory(req);
      res.status(201).json({
        message: "Search history created successfully",
        data: searchHistory,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  },

  getAllSearchHistory: async (req, res) => {
    try {
      const searchHistory = await SearchHistoryService.getAllSearchHistory(req);
      res.status(200).json({
        message: "Search history fetched successfully",
        data: searchHistory,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  },

  getSingleSearchHistory: async (req, res) => {
    try {
      const { searchId } = req.params;
      const search = await SearchHistoryService.getSingleSearchHistory(
        req,
        searchId
      );
      res.status(200).json({
        message: "Search fetched successfully",
        search,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  },

  deleteSingleSearchHistory: async (req, res) => {
    try {
      const { searchId } = req.params;
      await SearchHistoryService.deleteSingleSearchHistory(req, searchId);
      res.status(200).json({
        message: "Search history deleted successfully",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  },

  deleteAllSearchHistory: async (req, res) => {
    try {
      await SearchHistoryService.deleteAllSearchHistory(req);
      res.status(200).json({
        message: "Search history deleted successfully",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || "Internal server error",
      });
    }
  },
};

export default SearchHistoryController;
