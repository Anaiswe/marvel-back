const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiUrl = process.env.API_URL;
const apiKey = process.env.MARVEL_API_KEY;
// Get a list of comics OK
router.get("/Comics", async (req, res) => {
  try {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 20;
    const title = req.query.title || "";

    const response = await axios.get(
      //   `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&title=${req.query.search}`
      // `${apiUrl}/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}&limit=${limit}&title=${title}`
      // Attention, il faut préciser la route dans Postman si l'on veut skip/limit/etc...
      `${apiUrl}/comics?apiKey=${apiKey}&skip=${skip}&limit=${limit}&title=${title}`
      // `${apiUrl}/comics?apiKey=${apiKey}`
    );
    const comics = response.data;
    res.json(comics);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get a list of comics containing a specific character

router.get("/comics:characterId", async (req, res) => {
  // console.log("/comics/id>", req.params.id);
  try {
    const ComicsByCharacters = [req.params.characterId];
    // const idComics = "str";
    // const regex = /characterId/;
    const response = await axios.get(
      `${apiUrl}/comics/${ComicsByCharacters}?apiKey=${apiKey}`
    );
    const ComicsCharId = response.data;
    res.json(ComicsCharId);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
