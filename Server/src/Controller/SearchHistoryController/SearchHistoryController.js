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
}

export default SearchHistoryController
