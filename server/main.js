const { db } = require("./db");
const app = require(".");
const PORT = process.env.PORT || 8081;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}
  http://localhost:${PORT}/`);
  });
});
