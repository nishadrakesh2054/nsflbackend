import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Team from "./team.Model.js";

const Table = sequelize.define(
  "Table",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    played: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    won: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    drawn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    goalsFor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    goalsAgainst: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    goalDifference: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    form: {
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
    tableName: "tables",
    timestamps: true,
    paranoid: true,
  }
);

// Associations
Team.hasOne(Table, { foreignKey: "teamId", onDelete: "CASCADE" });
Table.belongsTo(Team, { foreignKey: "teamId", as: "team" });

// Hook to calculate points before saving
Table.beforeSave((team) => {
  team.points = team.won * 3 + team.drawn;
  team.goalDifference = team.goalsFor - team.goalsAgainst;
});

export default Table;
