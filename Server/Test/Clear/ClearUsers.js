import UserModel from "../../src/Model/UserModel";
import { Op } from "sequelize";

const clearUsers = async () => {
  try {
    await UserModel.destroy({
      where: {
        email: {
          [Op.in]: ["testuser@example.com", "testuser12@gmail.com"],
        },
      },
    });
  } catch (error) {
    console.log("Unable to clear test user :", error);
  }
};

export default clearUsers;
