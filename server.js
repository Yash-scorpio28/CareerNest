require("dotenv").config();

const express =
  require("express");
const mongoose =
  require("mongoose");
const cors =
  require("cors");

const authRoutes =
  require("./routes/authRoutes");
const jobRoutes =
  require("./routes/jobRoutes");
const applicationRoutes =
  require("./routes/applicationRoutes");
const uploadRoutes =
  require("./routes/uploadRoutes");

const app = express();   // THIS must come first

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

mongoose.connect(
  process.env.MONGO_URI
).then(() =>
  console.log(
    "MongoDB Connected"
  )
);

app.listen(
  5000,
  () =>
    console.log(
      "Server running on port 5000"
    )
);