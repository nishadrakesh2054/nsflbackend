import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    team_logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    team_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    team_manager: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foundedYear: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    stadium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // S3 storage fields
    imageKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Teams",
    timestamps: true,
    underscored: true,
  }
);

export default Team;
