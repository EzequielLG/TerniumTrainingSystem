const express = require('express');
const loginRouter = express.Router();
const axios = require('axios');

loginRouter.get('', async (req, res) => {
  res.render('login');
});

module.exports = loginRouter;
