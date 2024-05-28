const express = require('express');
const router = express.Router();

const initRoutes = (app) => {
  router.use('/user', require('./user'));
  router.use('/auth', require('./auth'));

  router.get("/", (req,res) => {
    return res.status(200).json({
      message: "API is running"
    })
  })

  return app.use('/api', router);
}

module.exports = initRoutes;