import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import AdminJS from "adminjs";
// import { ComponentLoader } from "adminjs";
import { componentLoader } from "../components/componentsLoader.js";
import Team from "../models/fixture/team.Model.js";
import Player from "../models/fixture/player.Model.js";
import Match from "../models/fixture/match.Model.js";
import Table from "../models/fixture/table.Model.js";
import TeamStatistics from "../models/fixture/teamStats.Model.js";
import LiveStreamingVideo from "../models/fixture/LiveStreaming.Model.js";

AdminJS.registerAdapter(AdminJSSequelize);

// const componentLoader = new ComponentLoader();
const localProvider = {
  bucket: "public/uploads",
  opts: {
    baseUrl: "/uploads",
  },
};

export const gameTeamResource = {
  resource: Team,
  options: {
    navigation: { name: "Teams", icon: "Users" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    listProperties: [
      "id",
      "team_name",
      "file",
      "team_manager",
      "foundedYear",
      "stadium",
    ],
    showProperties: [
      "id",
      "team_name",
      "team_logo",
      "file",
      "team_manager",
      "foundedYear",
      "stadium",
    ],

    properties: {
      id: { isVisible: false, position: 1 },
      team_name: { isTitle: true, position: 2 },
      team_logo: {
        type: "file",
        isVisible: { list: true, edit: false, filter: true, show: true },
        position: 3,
      },
      team_details: {
        type: "textarea",
        isVisible: { list: false, edit: true, filter: false, show: true },
        props: { rows: 6 },
        position: 7,
      },
      team_manager: { isVisible: true, position: 6 },
      foundedYear: { isVisible: true, position: 4 },
      stadium: { isVisible: true, position: 5 },
      createdAt: { isVisible: false, position: 8 },
      updatedAt: { isVisible: false, position: 9 },
      imageKey: { isVisible: false, position: 10 },
      bucket: { isVisible: false, position: 11 },
      mime: { isVisible: false, position: 12 },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        filePath: "team_logo",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      },
      uploadPath: (record, filename) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = filename.split(".").pop();
        return `teams/${filename.split(".")[0]}-${uniqueSuffix}.${ext}`;
      },
    }),
  ],
};
export const playerResource = {
  resource: Player,
  options: {
    navigation: { name: "Teams", icon: "User" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    listProperties: [
      "id",
      "name",
      "file",
      "position",
      "JerseyNumber",
      "teamId",
      "nationality",
      "age",
    ],
    showProperties: [
      "id",
      "name",
      "file",
      "position",
      "JerseyNumber",
      "teamId",
      "nationality",
      "age",
      "height",
      "weight",
      "achievements",
    ],
    properties: {
      id: { isVisible: false, position: 1 },
      name: { isTitle: true, position: 2 },
      img: {
        type: "file",
        isVisible: { list: true, edit: false, filter: true, show: true },
        position: 3,
      },
      position: {
        isVisible: true,
        position: 4,
        availableValues: [
          { value: "Goalkeeper", label: "Goalkeeper" },
          { value: "Defender", label: "Defender" },
          { value: "Midfielder", label: "Midfielder" },
          { value: "Forward", label: "Forward" },
        ],
      },
      JerseyNumber: { isVisible: true, position: 5 },
      teamId: {
        isVisible: true,
        position: 6,
        reference: "Teams",
      },
      nationality: { isVisible: true, position: 7 },
      age: { isVisible: true, position: 8 },
      height: { isVisible: true, position: 9 },
      weight: { isVisible: true, position: 10 },
      achievements: {
        type: "textarea",
        props: { rows: 4 },
        isVisible: { list: false, edit: true, filter: false, show: true },
        position: 11,
      },
      imageKey: { isVisible: false, position: 12 },
      bucket: { isVisible: false, position: 13 },
      mime: { isVisible: false, position: 14 },
      createdAt: { isVisible: false, position: 15 },
      updatedAt: { isVisible: false, position: 16 },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        filePath: "img",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      },
      uploadPath: (record, filename) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = filename.split(".").pop();
        return `players/${filename.split(".")[0]}-${uniqueSuffix}.${ext}`;
      },
    }),
  ],
};

export const matchFixtureResource = {
  resource: Match,
  options: {
    navigation: { name: "Matches", icon: "Calendar" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    listProperties: [
      "id",
      "match_date",
      "time",
      "venue",
      "homeTeamId",
      "awayTeamId",
      //   "homeTeam.team_name:homeTeam",
      //   "awayTeam.team_name:awayTeam",
      "status",
      "scoreHome",
      "scoreAway",
    ],
    showProperties: [
      "id",
      "match_date",
      "time",
      "venue",
      "homeTeamId",
      "awayTeamId",
      "status",
      "scoreHome",
      "scoreAway",
      "referee",
      "assistantReferee1",
      "assistantReferee2",
      "fourthOfficial",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      id: { isVisible: { list: false, show: true, edit: false } },
      match_date: {
        isVisible: true,
        type: "date",
        position: 1,
      },
      venue: { isVisible: true, position: 3 },
      time: {
        isVisible: true,
        position: 2,
      },
      venue: {
        isVisible: true,
        position: 3,
      },
      homeTeamId: {
        isVisible: true,
        position: 4,
        reference: "Teams",
      },
      awayTeamId: {
        isVisible: true,
        position: 5,
        reference: "Teams",
      },
      status: {
        isVisible: true,
        position: 6,
        availableValues: [
          { value: "upcoming", label: "Upcoming" },
          { value: "completed", label: "Completed" },
          { value: "today", label: "Today" },
        ],
      },
      scoreHome: {
        isVisible: true,
        position: 7,
      },
      scoreAway: {
        isVisible: true,
        position: 8,
      },
      referee: {
        isVisible: { list: false, show: true, edit: true },
        position: 9,
      },
      assistantReferee1: {
        isVisible: { list: false, show: true, edit: true },
        position: 10,
      },
      assistantReferee2: {
        isVisible: { list: false, show: true, edit: true },
        position: 11,
      },
      fourthOfficial: {
        isVisible: { list: false, show: true, edit: true },
        position: 12,
      },
      createdAt: {
        isVisible: { list: false, show: true, edit: false },
        position: 13,
      },
      updatedAt: {
        isVisible: { list: false, show: true, edit: false },
        position: 14,
      },
    },
  },
};

export const teamStatisticsResource = {
  resource: TeamStatistics,
  options: {
    navigation: { name: "Matches", icon: "BarChart2" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    listProperties: [
      "teamId",
      "matchesPlayed",
      "wins",
      "draws",
      "losses",
      "goalsScored",
      "goalsConceded",
      "goalDifference",
    ],
    showProperties: [
      "teamId",
      "matchesPlayed",
      "wins",
      "draws",
      "losses",
      "goalsScored",
      "goalsConceded",
      "goalDifference",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      teamId: {
        isVisible: true,
        position: 1,
        reference: "Teams",
      },
      matchesPlayed: {
        isVisible: true,
        position: 2,
        type: "number",
      },
      wins: {
        isVisible: true,
        position: 3,
        type: "number",
      },
      draws: {
        isVisible: true,
        position: 4,
        type: "number",
      },
      losses: {
        isVisible: true,
        position: 5,
        type: "number",
      },
      goalsScored: {
        isVisible: true,
        position: 6,
        type: "number",
      },
      goalsConceded: {
        isVisible: true,
        position: 7,
        type: "number",
      },
      goalDifference: {
        isVisible: true,
        position: 8,
        type: "number",
      },
      points: {
        isVisible: true,
        position: 9,
        type: "number",
      },
      createdAt: { isVisible: false, position: 10 },
      updatedAt: { isVisible: false, position: 11 },
    },
  },
};

export const LiveStreaming = {
  resource: LiveStreamingVideo,
  options: {
    navigation: {
      name: "Matches",
      icon: "Video",
    },
    listProperties: ["id", "youtubeUrl", "matchId", "createdAt", "updatedAt"],
    editProperties: ["youtubeUrl", "matchId"],
    showProperties: ["id", "youtubeUrl", "matchId", "createdAt", "updatedAt"],
  },
  properties: {
    youtubeUrl: {
      isVisible: true,
    },
    matchId: {
      isVisible: true,
      reference: "matches",
    },
  },
};

export const tableResource = {
  resource: Table,
  options: {
    navigation: { name: "League Table", icon: "Table" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    listProperties: [
      "id",
      //   "position",
      "played",
      "won",
      "drawn",
      "lost",
      "goalsFor",
      "goalsAgainst",
      "goalDifference",
      "points",
      "teamId",
    ],
    showProperties: [
      "id",
      //   "position",
      "played",
      "won",
      "drawn",
      "lost",
      "goalsFor",
      "goalsAgainst",
      "goalDifference",
      "points",
      "teamId",
    ],
    properties: {
      teamId: {
        position: 1,
        isVisible: true,
        reference: "Teams",
        isTitle: true,
      },
      position: {
        isTitle: true,
        position: 2,
        isVisible: false,
      },
      played: {
        isVisible: true,
        position: 3,
        type: "number",
      },
      won: {
        isVisible: true,
        position: 4,
        type: "number",
      },
      drawn: {
        isVisible: true,
        position: 5,
        type: "number",
      },
      lost: {
        isVisible: true,
        position: 6,
        type: "number",
      },
      goalsFor: {
        isVisible: true,
        position: 7,
        type: "number",
      },
      goalsAgainst: {
        isVisible: true,
        position: 8,
        type: "number",
      },
      goalDifference: {
        isVisible: true,
        position: 9,
        type: "number",
      },
      points: {
        isVisible: true,
        position: 10,
        type: "number",
      },
      createdAt: {
        isVisible: false,
        position: 11,
      },
      updatedAt: {
        isVisible: false,
        position: 12,
      },
    },
  },
};
