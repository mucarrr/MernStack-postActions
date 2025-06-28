const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");
const AuthRoutes = require("./routes/AuthRoute.js");
const PostRoutes = require("./routes/PostRoute.js");
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoutes);

const PORT = process.env.PORT || 5001;
database();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

