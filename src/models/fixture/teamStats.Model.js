import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Team from "./team.Model.js";

const TeamStatistics = sequelize.define(
  "TeamStatistics",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matchesPlayed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    draws: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    goalsScored: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    goalsConceded: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    cleanSheets: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    yellowCards: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    redCards: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    homeWins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    awayWins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
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
    tableName: "team_statistics",
    timestamps: true,
    paranoid: true,
  }
);

// Define relationships
Team.hasOne(TeamStatistics, { foreignKey: "teamId" });
TeamStatistics.belongsTo(Team, { foreignKey: "teamId" });

// Virtual getter for goal difference
TeamStatistics.prototype.getGoalDifference = function () {
  return this.goalsScored - this.goalsConceded;
};

// Virtual getter for win percentage
TeamStatistics.prototype.getWinPercentage = function () {
  return this.matchesPlayed > 0
    ? Math.round((this.wins / this.matchesPlayed) * 100)
    : 0;
};

export default TeamStatistics;
