// var createError = require("http-errors");
// import createError from "http-error";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

import "../server.js";
import App from "../app.js";

var app = express();

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use("/", App);

export default app;
