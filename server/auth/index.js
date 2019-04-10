const express = require("express");
const router = express.Router();
const { User } = require("../db");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.use("/google", require("./google"));

// router.put("/login", (req, res, next) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(user => {
//       if (!user) res.status(401).send("User not found");
//       else if (!user.hasMatchingPassword(req.body.password))
//         res.status(401).send("Incorrect password");
//       else {
//         req.login(user, err => {
//           if (err) next(err);
//           else res.json(user);
//         });
//       }
//     })
//     .catch(next);
// });

// router.post('/signup', (req, res, next) => {
//   User.create(req.body)
//     .then(user => {
//       req.login(user, err => {
//         if (err) next(err);
//         else res.json(user);
//       });
//     })
//     .catch(next);
// });

// router.delete('/logout', (req, res, next) => {
//   req.logout();
//   req.session.destroy()
//   res.sendStatus(204);
// });

// router.get('/me', (req, res, next) => {
//   res.json(req.user);
// });

module.exports = router;
