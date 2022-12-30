// create a express route for the root path and serve a react app
const express = require("express");
const path = require("path");

const router = new express.Router();

const baseURL = process.env.BASE_API_URL || 'http://localhost:3000';

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../client", "index.ejs"), {baseURL})
});

module.exports = router;
