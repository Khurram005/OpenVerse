import SavedSearchModel from "../Model/SaveSearchModel.js";
import UserModel from "../Model/UserModel.js";

const dbInit = async () => {
  await UserModel.sync({ alert: true, force: false });
  await SavedSearchModel.sync({ alert: true, force: false });
};

export default dbInit;
