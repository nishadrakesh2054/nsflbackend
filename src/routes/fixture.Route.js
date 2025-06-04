import express from "express";
import Team from "../models/fixture/team.Model.js";
import Player from "../models/fixture/player.Model.js";
import MatchEvent  from "../models/fixture/matchEvent.Model.js";
import Match from "../models/fixture/match.Model.js";

const router = express.Router();
// Helper function for consistent error responses
const handleError = (res, error, entity) => {
  console.error(`Error fetching ${entity}:`, error);
  res.status(500).json({
    success: false,
    error: `Failed to fetch ${entity}`,
  });
};
// GET all teams
router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["team_name", "ASC"]],
    });

    if (!teams.length) {
      return res.status(404).json({
        success: false,
        message: "No teams found",
      });
    }

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    handleError(res, error, "teams");
  }
});

// GET single team by ID
router.get("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        {
          model: Player,
          as: "Players",
          attributes: [
            "id",
            "name",
            "position",

            "img",
            "imageKey",
            "bucket",
            "mime",
          ],
        },
      ],
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        error: `Team not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    handleError(res, error, "team");
  }
});

// GET specific player from a specific team
router.get("/teams/:teamId/players/:playerId", async (req, res) => {
  try {
    const { teamId, playerId } = req.params;

    // First verify the team exists
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        error: `Team not found with id ${teamId}`,
      });
    }

    // Then find the player that belongs to this team
    const player = await Player.findOne({
      where: {
        id: playerId,
        team_id: teamId, // Ensure the player belongs to the specified team
      },
      include: [
        {
          model: Team,
          as: "team", // Make sure this matches your association alias
          attributes: [
            "id",
            "team_name",
            "team_logo",
            "imageKey",
            "bucket",
            "mime",
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        error: `Player not found with id ${playerId} in team ${teamId}`,
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    handleError(res, error, "team player");
  }
});

// GET players by team ID(yo team maa total player kati xa show garx)
router.get("/teams/:id/players", async (req, res) => {
  try {
    const players = await Player.findAll({
      where: { team_id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //   order: [[ "ASC"]],
    });

    if (!players.length) {
      return res.status(404).json({
        success: false,
        message: `No players found for team ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    handleError(res, error, "team players");
  }
});

// GET single player by ID
router.get("/players/:id", async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id, {
      include: [
        {
          model: Team,
          as: "team",
          attributes: [
            "id",
            "team_name",
            "team_logo",
            "imageKey",
            "bucket",
            "mime",
          ],
        },
      ],
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        error: `Player not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    handleError(res, error, "player");
  }
});

//matches
router.get("/match", async (req, res) => {
  try {
    const whereClause = req.query.status ? { status: req.query.status } : {};
    const fixtures = await Match.findAll({
      where: whereClause,
      include: [
        {
          model: Team,
          as: "homeTeam",
          attributes: [
            "id",
            "team_name",
            "team_logo",
            "imageKey",
            "bucket",
            "mime",
          ],
        },
        {
          model: Team,
          as: "awayTeam",
          attributes: [
            "id",
            "team_name",
            "team_logo",
            "imageKey",
            "bucket",
            "mime",
          ],
        },
      ],
      order: [
        ["match_date", "ASC"],
        ["time", "ASC"],
      ],
    });

    res.status(200).json({
      success: true,
      count: fixtures.length,
      data: fixtures,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

// GET single match by ID
router.get("/match/:id", async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        {
          model: Team,
          as: "homeTeam",
          attributes: [
            "id",
            "team_name",
            "team_logo",
            "imageKey",
            "bucket",
            "mime",
            "stadium",
          ],
        },
        {
          model: Team,
          as: "awayTeam",
          attributes: [
            "id",
            "team_name",
            "team_logo",
            "imageKey",
            "bucket",
            "mime",
            "stadium",
          ],
        },
        {
          model: MatchEvent ,
          as: "events",
          attributes: ["id", "eventType", "eventTime", "teamId", "playerId"],
          include: [
            {
              model: Player,
              attributes: [
                "id",
                "name",
                "img",
                "imageKey",
                "bucket",
                "mime",
              ],
            },
          ],
        },
      ],
    });

    if (!match)
      return res.status(404).json({ success: false, error: "Match not found" });

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    handleError(res, error, "match");
  }
});

export default router;
