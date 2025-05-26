import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Blog = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preview: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
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

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    category: {
      type: DataTypes.ENUM(
        "Match Reports",
        "League News",
        "Team News",
        "Interviews"
      ),
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "News",
  }
);

export default Blog;
