import { Sequelize } from "sequelize";
import db from "../config/connection.js";
import jwt from "jsonwebtoken";

const { DataTypes } = Sequelize;
const users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default users;
