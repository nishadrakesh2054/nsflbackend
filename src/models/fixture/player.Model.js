import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Team from "./team.Model.js";

const Player = sequelize.define(
  "Player",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appearance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cleansheet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    yellowcards: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    redcards: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateofbirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },

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
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id",
      },
    },
  },
  {
    tableName: "Players",
    timestamps: true,
    underscored: true,
  }
);

// Associations
Team.hasMany(Player, { foreignKey: "teamId", onDelete: "CASCADE" });
Player.belongsTo(Team, { foreignKey: "teamId", as: "team" });

export default Player;
