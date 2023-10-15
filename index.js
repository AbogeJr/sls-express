const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");

// const routes = require("./routes");
const { prisma } = require("./prisma/PrismaClient");
// Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/users", async (req, res, next) => {
  try {
    // Use Prisma client to query the User model for all users
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
