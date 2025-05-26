import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import {
  extractVideoId,
  fetchYouTubeStats,
  formatDuration,
} from "../service/YoutubeService.js";

const Highlight = sequelize.define(
  "Highlights",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Untitled",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
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

    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isYoutubeUrl(value) {
          if (value && !extractVideoId(value)) {
            throw new Error("Invalid YouTube URL");
          }
        },
      },
    },
    videoId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "highlights",
    hooks: {
      beforeSave: async (highlight) => {
        if (highlight.videoUrl && highlight.changed("videoUrl")) {
          await updateYouTubeData(highlight);
        }
      },
    },
  }
);

async function updateYouTubeData(highlight) {
  const videoId = extractVideoId(highlight.videoUrl);
  if (!videoId) return;

  highlight.videoId = videoId;

  const stats = await fetchYouTubeStats(videoId);
  if (stats) {
    highlight.views = stats.views;
    highlight.duration = formatDuration(stats.duration);
    highlight.publishedDate = stats.publishedDate
      ? new Date(stats.publishedDate)
      : null;

    highlight.lastUpdated = new Date();
  }
}

// Instance method to refresh YouTube data
Highlight.prototype.refreshYouTubeData = async function () {
  await updateYouTubeData(this);
  return this.save();
};

export default Highlight;
