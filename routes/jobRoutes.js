const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require(
  "../middleware/authMiddleware"
);
const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

const router = express.Router();

/* CREATE JOB (Recruiter only) */
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const {
        title,
        company,
        description,
        skills,
        salary,
      } = req.body;

      const newJob = new Job({
        title,
        company,
        description,
        skills,
        salary,
        postedBy: req.user.id,
      });

      await newJob.save();

      res.json({
        message:
          "Job posted successfully",
        job: newJob,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to create job",
           error: error.message,
      });
    }
  }
);

/* GET ALL JOBS */
router.get(
  "/all",
  async (req, res) => {
    try {
      const jobs =
        await Job.find().populate(
          "postedBy",
          "name email"
        );

      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch jobs",
      });
    }
  }
);

/* DELETE JOB (Recruiter only) */
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      await Job.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Job deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to delete job",
      });
    }
  }
);

module.exports = router;