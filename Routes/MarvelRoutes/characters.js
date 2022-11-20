const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiUrl = process.env.API_URL;
const apiKey = process.env.MARVEL_API_KEY;

router.get("/characters", async (req, res) => {
  console.log("/characters=");
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    const name = req.query.name || "";

    const response = await axios.get(
      `${apiUrl}/characters?apiKey=${apiKey}&limit${limit}&skip${skip}&name${name}`
    );

    const characters = response.data;
    res.json(characters);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    let characterId = req.params.characterId;
    const skip = req.query.skip || null;
    console.log(characterId);
    const response = await axios.get(
      `${apiUrl}/character/${characterId}?apikey=${apiKey}`
    );
    characterId = response.data;
    console.log(response.data);
    res.json(characterId);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
