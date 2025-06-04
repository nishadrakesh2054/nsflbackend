import { Sequelize } from "sequelize";
import "dotenv/config";

const NODE_ENV = (process.env.NODE_ENV || "development").trim().toLowerCase();
const isProduction = NODE_ENV === "production";
const useRailway = isProduction && !!process.env.MYSQL_PUBLIC_URL;

let sequelize;

if (useRailway) {
  // 🌐 Use Railway MySQL in production
  sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
    dialect: "mysql",
    logging: false,
  });
} else {
  // 💻 Use local XAMPP MySQL in development
  sequelize = new Sequelize(
    process.env.DBNAME || "nsfl",
    process.env.DBUSER || "root",
    process.env.DBPASSWORD || "",
    {
      host: process.env.DBHOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      logging: false,
    }
  );
}

// Connect to the DB and log the result
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully.");
    console.log(
      `🔌 Environment: ${NODE_ENV.toUpperCase()} | ${
        useRailway
          ? "🌐 Connected to Railway MySQL (Production)"
          : "💻 Connected to Local XAMPP MySQL (Development)"
      }`
    );
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
  }
})();

export default sequelize;
