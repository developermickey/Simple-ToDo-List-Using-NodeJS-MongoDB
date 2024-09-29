const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const todoRoutes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", todoRoutes);

app.listen(port, () => {
  console.log("Server Runing Port 3000");
});
