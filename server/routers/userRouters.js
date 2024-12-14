const express = require('express');
const {
    cronJob
} = require('../controllers/userControllers');

const routers = express.Router();


// General utility routes
routers.get('/cron-job', cronJob);

module.exports = ("userRouters", routers);