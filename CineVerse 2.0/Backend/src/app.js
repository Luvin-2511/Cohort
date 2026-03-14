/**
 * Dotenv required so we can access process.env.xyz
 */

require("dotenv").config();

/**
 * Requiring all necessary modules
 */

const express = require("express");

const app = express();

module.exports = app;
