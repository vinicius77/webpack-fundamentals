const express = require("express");
const router = express.Router();

const Notes = require("../../db.json");

router.get("/", async (request, response) => {
  const { notes } = await Notes;

  return response.json(notes);
});

module.exports = router;
