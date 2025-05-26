import express from "express";
import LiveStreamingVideo from "../models/fixture/LiveStreaming.Model.js";

const router = express.Router();
const handleError = (res, error, entity) => {
  console.error(`Error fetching ${entity}:`, error);
  res.status(500).json({
    success: false,
    error: `Failed to fetch ${entity}`,
  });
};
// 📹 Get all live videos with team names
router.get("/live", async (req, res) => {
  try {
    const liveVideos = await LiveStreamingVideo.findAll({
        attributes: ["id", "youtubeUrl", "isActive", "createdAt", "updatedAt"],

      include: [
        {
          association: "matches",
          attributes: ["match_date", "time", "venue", "status"],

          include: [
            {
              association: "homeTeam",
              attributes: ["id", "team_name", "team_logo", "image_key", "bucket",'mime'],
            },
            {
              association: "awayTeam",
              attributes: ["id", "team_name", "team_logo", "image_key", "bucket",'mime'],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!liveVideos.length) {
      return res.status(404).json({
        success: false,
        message: "No live videos found",
      });
    }

    res.status(200).json({
      success: true,
      count: liveVideos.length,
      data: liveVideos,
    });
  } catch (error) {
    handleError(res, error, "live videos");
  }
});

export default router;
