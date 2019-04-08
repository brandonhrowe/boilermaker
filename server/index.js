const PORT = process.env.PORT || 8081;
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();
module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}
  http://localhost:${PORT}/`);
});
