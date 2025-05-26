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
    JerseyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    achievements: {
      type: DataTypes.TEXT,
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
