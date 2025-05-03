import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import UserModel from "./UserModel.js";

const SavedSearchModel = sequelize.define("saved_search", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// relation between User and SavedSearch models
UserModel.hasMany(SavedSearchModel);
SavedSearchModel.belongsTo(UserModel);

export default SavedSearchModel;
