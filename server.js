const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const PORT = process.env.PORT || 8080;

const db = require("./models");


const app = express();
app.use(compression());

const databaseName = "workout_data_base"

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

 mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_data_base", { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log(`Successfully connected to database: ${databaseName}`))


//  routes

app.use("/api", require("./routes/api-routes.js"));
app.use("/", require("./routes/html-routes.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});