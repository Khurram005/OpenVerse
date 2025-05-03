import UserModel from "../Model/UserModel.js";

const clearUsers = async() => {
    try {
        await UserModel.destroy({
            where: {
                email: "testuser@example.com"
            }
        })
    } catch (error) {
        console.log("Unable to clear test user :", error);
    }
}

export default clearUsers