

import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    logging: false,
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL Database  Connected  successfully.");
  } catch (error) {
    console.error("Unable to connect to the MySQL database:", error);
  }
};

connect();

export default sequelize;
