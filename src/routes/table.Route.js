import express from "express";
import Table from "../models/fixture/table.Model.js";
import Team from "../models/fixture/team.Model.js";

const router = express.Router();
const handleError = (res, error, entity) => {
  console.error(`Error fetching ${entity}:`, error);
  res.status(500).json({
    success: false,
    error: `Failed to fetch ${entity}`,
  });
};

// GET league table sorted by points (descending)
router.get("/tables", async (req, res) => {
  try {
    const tables = await Table.findAll({
      include: {
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
      order: [
        ['points', 'DESC'],
        ['goalDifference', 'DESC'],
        ['goalsFor', 'DESC'],
        // Add other tiebreakers as needed (e.g., head-to-head)
      ],
    });

      // Assign positions based on sorted order
      const tablesWithPosition = tables.map((table, index) => ({
        ...table.get({ plain: true }),
        position: index + 1,
      }));
  
      if (!tablesWithPosition.length) {
        return res.status(404).json({ success: false, message: "No tables found" });
      }

    res.status(200).json({
      success: true,
      count: tablesWithPosition.length,
      data: tablesWithPosition,
    });
  } catch (error) {
    handleError(res, error, "tables");
  }
});

export default router;
