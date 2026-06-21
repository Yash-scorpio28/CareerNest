const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");
const authMiddleware = require(
  "../middleware/authMiddleware"
);
const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

/* APPLY TO JOB (Candidate only) */
router.post(
  "/apply/:jobId",
  authMiddleware,
  roleMiddleware(["candidate"]),
  async (req, res) => {
    try {
      const job =
        await Job.findById(
          req.params.jobId
        );

      if (!job) {
        return res.status(404).json({
          message: "Job not found",
        });
      }

      const existingApplication =
        await Application.findOne({
          candidate: req.user.id,
          job: req.params.jobId,
        });

      if (existingApplication) {
        return res.status(400).json({
          message:
            "Already applied",
        });
      }

      const newApplication =
        new Application({
          candidate: req.user.id,
          job: req.params.jobId,
        });

      await newApplication.save();

      res.json({
        message:
          "Applied successfully",
        application:
          newApplication,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Application failed",
      });
    }
  }
);

/* VIEW MY APPLICATIONS */
router.get(
  "/my-applications",
  authMiddleware,
  roleMiddleware(["candidate"]),
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          candidate: req.user.id,
        }).populate("job");

      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch applications",
      });
    }
  }
);

/* RECRUITER VIEW APPLICANTS */
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  async (req, res) => {
    try {
      const applicants =
        await Application.find({
          job: req.params.jobId,
        }).populate(
          "candidate",
          "name email resume profilePic"
        );

      res.json(applicants);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch applicants",
      });
    }
  }
);

module.exports = router;