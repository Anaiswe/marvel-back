const express = require("express");
const router = express.Router();
// si inscription

// Si le temps d'import favoris
const isAuthenticated = require("../middlewares/IsAuthenticated");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// const User = require("../Models/User");

// Signup
router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password } = req.fields;

    const findUser = await User.findOne({ email: email });

    // token
    if (username && password) {
      if (!findUser) {
        const salt = uid2(16);

        const hash = SHA256(password + salt).toString(encBase64);

        const token = uid2(64);

        const newUser = new User({
          email: email,
          username: username,
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();

        // Response sans hash / salt
        res.status(200).json({
          _id: newUser._id,
          token: token,
          username: username,
        });
      } else {
        res.status(400).json({ message: "email already exists." });
      }
    } else {
      res.status(401).json({ message: "error" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.fields;

    const findUser = await User.findOne({ email: email });

    if (email && password && findUser) {
      const newHash = SHA256(password + findUser.salt).toString(encBase64);

      if (findUser.hash === newHash) {
        res.status(200).json({
          _id: findUser._id,
          token: findUser.token,
          username: findUser.username,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
