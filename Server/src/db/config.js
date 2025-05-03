import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection to DB established`);
  } catch (error) {
    console.log(`something went wrong while connecting to fb : ${error}`);
  }
};

export default sequelize;