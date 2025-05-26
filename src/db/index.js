

import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
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
// import { Sequelize } from "sequelize";
// import "dotenv/config";
// import config from "../../config/config.json";

// const env = process.env.NODE_ENV || "development";

// // Conditional database configuration
// const getDbConfig = () => {
//   // Use environment variables if in production
//   if (env === "production") {
//     return {
//       database: process.env.DBNAME || "nsfl",
//       username: process.env.DBUSER || "root",
//       password: process.env.DBPASSWORD || null,
//       host: process.env.DBHOST || "localhost",
//       port: process.env.DBPORT || 3306,
//       dialect: "mysql"
//     };
//   }

//   // Use config file for development/test
//   return {
//     ...config[env],
//     // Override with any existing environment variables
//     database: process.env.DBNAME || config[env].database,
//     username: process.env.DBUSER || config[env].username,
//     password: process.env.DBPASSWORD || config[env].password,
//     host: process.env.DBHOST || config[env].host,
//     port: process.env.DBPORT || config[env].port || 3306
//   };
// };

// const dbConfig = getDbConfig();

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     port: dbConfig.port,
//     dialect: dbConfig.dialect,
//     logging: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },
//     define: {
//       timestamps: true,
//       underscored: true
//     },
//     timezone: "+05:45" // Nepal timezone (adjust as needed)
//   }
// );

// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(`✅ MySQL (${env}) database connected successfully`);
    
//     // Sync models if in development
//     if (env === "development") {
//       await sequelize.sync({ alter: true });
//       console.log("🔄 Database synchronized");
//     }
//   } catch (error) {
//     console.error("❌ Unable to connect to MySQL database:", error.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// // Test connection immediately
// connect();

// export default sequelize;