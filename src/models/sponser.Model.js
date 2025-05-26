import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Sponsor = sequelize.define(
  "Sponsor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageKey: {
      type: DataTypes.STRING,
    },
    bucket: {
      type: DataTypes.STRING,
    },
    mime: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "sponsors",
  }
);

export default Sponsor;
