// var mysql = require("mysql");
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const user = "uvwvc1uf3p3geszx";
const password = "hVwRnAIbQDi0hsIoj7Wy";
const database = "bv4yes5gbuhpqn8gsc3z";
const port = "3306";

const con = new Sequelize(database, user, password, {
  host: hostname,
  dialect: "mysql",
});

export default con;
