import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import AdminJS from "adminjs";

// import { ComponentLoader } from "adminjs";
import { componentLoader } from "../components/componentsLoader.js";
import Team from "../models/fixture/team.Model.js";
import Player from "../models/fixture/player.Model.js";
import Match from "../models/fixture/match.Model.js";
import Table from "../models/fixture/table.Model.js";
import MatchEvent from "../models/fixture/matchEvent.Model.js";
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
      "teamId",
      "nationality",
      "dateofbirth",
    ],
    showProperties: [
      "id",
      "name",
      "file",
      "position",

      "teamId",
      "nationality",
      "dateofbirth",
      "height",
      "weight",
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
      appearance: { position: 5 },
      cleansheet: { position: 6 },
      goals: { position: 7 },
      yellowcards: { position: 8 },
      redcards: { position: 9 },
      teamId: {
        isVisible: true,
        position: 10,
        reference: "Teams",
      },
      nationality: { position: 11 },
      dateofbirth: { position: 12, isVisible: true, type: "date" },
      height: { position: 13 },
      weight: { position: 14 },

      imageKey: { isVisible: false, position: 15 },
      bucket: { isVisible: false, position: 16 },
      mime: { isVisible: false, position: 17 },
      createdAt: { isVisible: false, position: 18 },
      updatedAt: { isVisible: false, position: 19 },
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
      "week",
      "homeTeamId",
      "awayTeamId",
      "status",
      "scoreHome",
      "scoreAway",
    ],
    showProperties: [
      "id",
      "match_date",
      "time",
      "venue",
      "week",
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
          { value: "running", label: "Running" },
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
      week: {
        isVisible: { list: true, show: true, edit: true },
        position: 15,
      },
    },
  },
};

export const MatchEventsResource = {
  resource: MatchEvent,
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
      "eventType",
      "eventTime",
      "matchInfo",
      "matchId",
      "playerId",
      "teamId",
      "createdAt",
    ],
    showProperties: [
      "id",
      "eventType",
      "eventTime",
      "matchInfo",
      "matchId",
      "playerId",
      "teamId",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      eventType: {
        isVisible: true,
        availableValues: [
          { value: "goal", label: "Goal" },
          { value: "yellow_card", label: "Yellow Card" },
          { value: "red_card", label: "Red Card" },
          { value: "own_goal", label: "Own Goal" },
          { value: "substitution", label: "Substitution" },
        ],
        position: 1,
      },
      eventTime: {
        isVisible: true,
        type: "number",
        position: 2,
      },
      matchId: {
        isVisible: true,
        reference: "matches",
        position: 3,
      },
      playerId: {
        isVisible: true,
        reference: "Players",
        position: 4,
      },
      teamId: {
        isVisible: true,
        reference: "Teams",
        position: 5,
      },
      createdAt: {
        isVisible: { list: true, show: true, edit: false, filter: true },
        position: 6,
      },
      updatedAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      deletedAt: {
        isVisible: false,
      },
      matchInfo: {
        isVisible: { list: true, show: true, edit: false, filter: false },
        isDisabled: true,
        type: "string",
        position: 3,
      },
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
