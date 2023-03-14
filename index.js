require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const RootRoutes = require("./router");
const mongoose = require("mongoose");

app.use(
  cors({
    origin: "*",
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: "*",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(RootRoutes);

mongoose.connect(process.env.MONGO).then(() => {
  app.listen(process.env.PORT,() => {
     console.log(`Server is running on : ${process.env.PORT} `)
   });
});