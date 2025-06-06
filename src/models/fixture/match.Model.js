import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Team from "./team.Model.js";

const Match = sequelize.define(
  "Match",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    match_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("upcoming", "running", "completed"),
      defaultValue: "upcoming",
    },
    scoreHome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    scoreAway: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    referee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assistantReferee1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assistantReferee2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fourthOfficial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id",
      },
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id",
      },
    },
  },
  {
    tableName: "matches",
    timestamps: true,
    paranoid: true,
  }
);

Team.hasMany(Match, { foreignKey: "homeTeamId", as: "homeMatches" });
Team.hasMany(Match, { foreignKey: "awayTeamId", as: "awayMatches" });
Match.belongsTo(Team, { foreignKey: "homeTeamId", as: "homeTeam" });
Match.belongsTo(Team, { foreignKey: "awayTeamId", as: "awayTeam" });

// Add virtual fields for status updates

export default Match;
