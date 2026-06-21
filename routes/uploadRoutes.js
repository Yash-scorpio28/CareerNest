const express = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* Upload Resume */
router.post(
  "/resume",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const result =
        await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          { resource_type: "raw" }
        );

      await User.findByIdAndUpdate(
        req.user.id,
        { resume: result.secure_url }
      );

      res.json({
        message: "Resume uploaded",
        url: result.secure_url,
      });
    } catch (error) {
      res.status(500).json({
        message: "Resume upload failed",
      });
    }
  }
);

/* Upload Profile Pic */
router.post(
  "/profile-pic",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const result =
        await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        );

      await User.findByIdAndUpdate(
        req.user.id,
        { profilePic: result.secure_url }
      );

      res.json({
        message: "Profile picture uploaded",
        url: result.secure_url,
      });
    } catch (error) {
      res.status(500).json({
        message: "Profile pic upload failed",
      });
    }
  }
);

module.exports = router;