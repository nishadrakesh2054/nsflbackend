import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Match from "./match.Model.js";
import { extractVideoId} from "../../service/YoutubeService.js";

const LiveStreamingVideo = sequelize.define(
  "LiveStreaming",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    youtubeUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        isYoutubeUrl(value) {
            if (!extractVideoId(value)) {
              throw new Error("Invalid YouTube URL");
            }
          },
      },
    },
    // videoId: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    timestamps: true,
    tableName: "live_streaming",
  }
);

// Relationships - corrected to match your naming convention
Match.hasOne(LiveStreamingVideo, {
  foreignKey: "matchId",
  as: "liveStream",
});

LiveStreamingVideo.belongsTo(Match, {
  foreignKey: "matchId",
  as: "matches",
});

// Default scope with proper field names
LiveStreamingVideo.addScope("defaultScope", {
  include: [
    {
      model: Match,
      as: "matches",
      include: [
        {
          association: "homeTeam",
          attributes: ["id", "team_name", "team_logo", "image_key", "bucket"],
        },
        {
          association: "awayTeam",
          attributes: ["id", "team_name", "team_logo", "image_key", "bucket"],
        },
      ],
    },
  ],
});

export default LiveStreamingVideo;
