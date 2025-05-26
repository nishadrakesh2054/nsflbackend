import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Newsletter = sequelize.define(
  "Newsletter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,

    tableName: "Newsletter",
  }
);

export default Newsletter;
