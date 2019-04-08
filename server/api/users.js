const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send({
    user: "hello"
  })
})

module.exports = router
