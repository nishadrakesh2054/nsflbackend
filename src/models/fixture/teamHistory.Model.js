import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Team from "./team.Model.js";
import Match from "./match.Model.js";

const TeamHistory = sequelize.define(
  "TeamHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matchDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("upcoming", "win", "loss", "draw"),
      defaultValue: "upcoming",
    },

    // Foreign keys
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id",
      },
    },
    opponentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id",
      },
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Match,
        key: "id",
      },
    },
  },
  {
    tableName: "team_histories",
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["matchId", "teamId"],
      },
    ],
  }
);

// Relationships
Team.hasMany(TeamHistory, { foreignKey: "teamId", as: "teamHistories" });
Team.hasMany(TeamHistory, {
  foreignKey: "opponentId",
  as: "opponentHistories",
});
Match.hasMany(TeamHistory, { foreignKey: "matchId", as: "matchHistories" });

TeamHistory.belongsTo(Team, { foreignKey: "teamId", as: "team" });
TeamHistory.belongsTo(Team, { foreignKey: "opponentId", as: "opponent" });
TeamHistory.belongsTo(Match, { foreignKey: "matchId", as: "match" });

// Hook to auto-update status before saving
TeamHistory.beforeSave(async (history) => {
  const match = await Match.findByPk(history.matchId);
  if (!match || match.scoreHome == null || match.scoreAway == null) return;

  const isHome = history.teamId === match.homeTeamId;
  const isAway = history.teamId === match.awayTeamId;

  if (isHome) {
    if (match.scoreHome > match.scoreAway) history.status = "win";
    else if (match.scoreHome < match.scoreAway) history.status = "loss";
    else history.status = "draw";
  } else if (isAway) {
    if (match.scoreAway > match.scoreHome) history.status = "win";
    else if (match.scoreAway < match.scoreHome) history.status = "loss";
    else history.status = "draw";
  }
});

// Instance method to return formatted result
TeamHistory.prototype.getFormattedResult = function () {
  if (!this.match || this.status === "upcoming") return "vs";
  const { scoreHome, scoreAway } = this.match;
  return `${scoreHome} - ${scoreAway}`;
};

// Instance method to get label
TeamHistory.prototype.getResultLabel = function () {
  switch (this.status) {
    case "win":
      return "Win";
    case "loss":
      return "Loss";
    case "draw":
      return "Draw";
    default:
      return "Upcoming";
  }
};

export default TeamHistory;
