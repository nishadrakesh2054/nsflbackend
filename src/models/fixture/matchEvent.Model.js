import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Match from "./match.Model.js";
import Player from "./player.Model.js";
import Team from "./team.Model.js";

const MatchEvent = sequelize.define(
  "MatchEvent",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventType: {
      type: DataTypes.ENUM(
        "goal",
        "yellow_card",
        "red_card",
        "own_goal",
        "substitution"
      ),
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Associations
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Match,
        key: "id",
      },
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Player,
        key: "id",
      },
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
    tableName: "match_events",
    timestamps: true,

  }
);

// Associations
Match.hasMany(MatchEvent, { foreignKey: "matchId", as: "events" });
MatchEvent.belongsTo(Match, { foreignKey: "matchId" });

Player.hasMany(MatchEvent, { foreignKey: "playerId", as: "playerEvents" });
MatchEvent.belongsTo(Player, { foreignKey: "playerId" });

Team.hasMany(MatchEvent, { foreignKey: "teamId", as: "teamEvents" });
MatchEvent.belongsTo(Team, { foreignKey: "teamId" });

//virtual filed added
MatchEvent.prototype.getMatchInfo = async function () {
    const match = await Match.findByPk(this.matchId, {
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
  
    return match
      ? `${match.homeTeam?.name || 'N/A'} vs ${match.awayTeam?.name || 'N/A'}`
      : 'Unknown Match';
  };
export default MatchEvent;
