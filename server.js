import con from "./config/connection.js";
import app from "./app.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = 5000;
const apps = express();
try {
  await con.authenticate();
  console.log("Database Connect");
  // await Users.sync();
} catch (error) {
  console.log(error);
}

apps.use(express.json());
apps.use(app);
apps.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
