const router = require("express").Router();
const User = require("../db/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
