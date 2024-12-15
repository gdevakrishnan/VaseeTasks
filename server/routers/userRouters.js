const express = require('express');
const {
    cronJob,
    adminLogin,
    createManager,
    managerLogin,
    createWorker,
    loginWorker,
    editWorker,
    verifyToken,
    deleteManager,
    deleteWorker
} = require('../controllers/userControllers');

const routers = express.Router();

// Admin Routes
routers.post("/admin/login", adminLogin);

// Manager Routes
routers.post("/manager/create", createManager);
routers.post("/manager/login", managerLogin);
routers.delete("/manager/:id", deleteManager);

// Worker Routes
routers.post("/worker/create", createWorker);
routers.post("/worker/login", loginWorker);
routers.put("/worker/edit/:id", editWorker);
routers.delete("/worker/:id", deleteWorker);

// Token Verification
routers.get("/verify-token", verifyToken);

// Cron Job Endpoint
routers.get("/cron-job", cronJob);

module.exports = ("userRouters", routers);