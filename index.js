// IMPORT PACKAGES
const express = require("express"); //OK
const cors = require("cors"); //OK
const formidable = require("express-formidable");
require("dotenv").config(); //OK
const mongoose = require("mongoose");
const axios = require("axios"); //OK
// Création du serveur
const app = express(); //OK
// app.use(formidable());
app.use(express.json()); //OK
app.use(cors()); //OK

// dB Connect auth
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// IMPORT ROUTES
const comicsRoutes = require("./Routes/MarvelRoutes/comics");
app.use(comicsRoutes);
const charactersRoutes = require("./Routes/MarvelRoutes/characters");
app.use(charactersRoutes);
const userRoutes = require("./Routes/user");
app.use(userRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Fake-Marvel");
});

//  démarrer le serveur

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found !" });
});
const port = process.env.PORT || 3000;
app.listen(`${port}`, () => {
  console.log("Server is Ok");
});
