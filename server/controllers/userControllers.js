const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Manager = require("../models/managerModels");
const Worker = require("../models/workerModels");
require("dotenv").config();

const { ADMIN_USERNAME, ADMIN_PASSWORD, SECRET_KEY, EXPIRY_TIME } = process.env;

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
};

// Login controller for admin
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        if (username !== ADMIN_CREDENTIALS.username) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const isPasswordValid = password === ADMIN_CREDENTIALS.password;

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Admin logged in successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Function to generate a 6-character alphanumeric company ID
const generateUniqueCompanyId = async () => {
    const generateId = () => {
        const letters = Math.random().toString(36).substring(2, 5).toUpperCase();
        const numbers = Math.floor(100 + Math.random() * 900).toString();
        return `${letters}${numbers}`;
    };

    let companyId;
    let isUnique = false;

    while (!isUnique) {
        companyId = generateId();
        const existingManager = await Manager.findOne({ company_id: companyId });
        if (!existingManager) isUnique = true;
    }

    return companyId;
};

// Controller to create a new manager
const createManager = async (req, res) => {
    try {
        const { username, password, company_name, company_address, phNo, email } = req.body;

        const existingManager = await Manager.findOne({ email });
        if (existingManager) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const company_id = await generateUniqueCompanyId();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newManager = new Manager({
            username,
            password: hashedPassword,
            company_name,
            company_address,
            company_id,
            phNo,
            email,
            role: "manager",
        });

        const savedManager = await newManager.save();

        res.status(201).json({
            message: "Manager created successfully.",
            manager: {
                _id: savedManager._id,
                username: savedManager.username,
                email: savedManager.email,
                company_id: savedManager.company_id,
                company_name: savedManager.company_name,
                company_address: savedManager.company_address,
                phNo: savedManager.phNo,
                role: savedManager.role,
                createdAt: savedManager.createdAt,
            },
        });
    } catch (err) {
        console.error("Error creating manager:", err.message);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Login controller for Manager
const managerLogin = async (req, res) => {
    try {
        const { username, company_id, password } = req.body;

        // Check if required fields are provided
        if (!username || !company_id || !password) {
            return res.status(400).json({ error: "Username, company ID, and password are required" });
        }

        // Find the manager with matching username and company_id
        const manager = await Manager.findOne({ username, company_id });
        if (!manager) {
            return res.status(401).json({ error: "Invalid username or company ID" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, manager.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: manager._id,
                username: manager.username,
                role: manager.role,
                company_id: manager.company_id,
            },
            SECRET_KEY,
            { expiresIn: EXPIRY_TIME } // Set token expiry as per your requirement
        );

        // Send response with token and manager details
        res.status(200).json({
            message: "Manager logged in successfully",
            token,
            manager: {
                _id: manager._id,
                username: manager.username,
                email: manager.email,
                company_id: manager.company_id,
                company_name: manager.company_name,
                company_address: manager.company_address,
                phNo: manager.phNo,
                role: manager.role,
                createdAt: manager.createdAt,
            },
        });
    } catch (err) {
        console.error("Error during manager login:", err.message);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

// Create Worker
const createWorker = async (req, res) => {
    try {
        const { name, password, job_role, ph_no, email, department, profile, company_id } = req.body;

        // Check if email already exists
        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new worker
        const newWorker = new Worker({
            name,
            password: hashedPassword,
            job_role,
            ph_no,
            email,
            department,
            profile,
            company_id,
        });

        const savedWorker = await newWorker.save();

        res.status(201).json({
            message: "Worker created successfully",
            worker: {
                _id: savedWorker._id,
                name: savedWorker.name,
                email: savedWorker.email,
                company_id: savedWorker.company_id,
                job_role: savedWorker.job_role,
                role: savedWorker.role
            },
        });
    } catch (err) {
        console.error("Error creating worker:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// Login Worker
const loginWorker = async (req, res) => {
    try {
        const { name, email, password, company_id } = req.body;

        // Validate name, email, password, and company_id
        if (!name || !email || !password || !company_id) {
            return res.status(400).json({ message: "Name, email, password, and company ID are required" });
        }

        // Find the worker by email and company_id
        const worker = await Worker.findOne({ email, company_id });
        if (!worker) {
            return res.status(400).json({ message: "Invalid email or company ID" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, worker.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token excluding password
        const token = jwt.sign(
            {
                id: worker._id,
                name: worker.name,
                email: worker.email,
                company_id: worker.company_id,
                role: worker.role,
            },
            SECRET_KEY,
            { expiresIn: "1h" } // Set token expiry time as needed
        );

        // Send response with token and success message
        res.status(200).json({
            message: "Worker logged in successfully",
            worker: {
                id: worker._id,
                name: worker.name,
                email: worker.email,
                company_id: worker.company_id,
                role: worker.role,
            },
            token,
        });
    } catch (err) {
        console.error("Error logging in worker:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// Edit Worker
const editWorker = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Update worker details
        const updatedWorker = await Worker.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedWorker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        res.status(200).json({
            message: "Worker updated successfully",
            worker: updatedWorker,
        });
    } catch (err) {
        console.error("Error updating worker:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// Verify Token
const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Fetch user details
        const worker = await Worker.findById(decoded.id).select("-password");

        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        res.status(200).json({
            message: "Token verified successfully",
            worker,
        });
    } catch (err) {
        console.error("Error verifying token:", err.message);
        res.status(401).json({ message: "Invalid or expired token", error: err.message });
    }
};

// Delete the manager
const deleteManager = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the manager by ID
        const deletedManager = await Manager.findByIdAndDelete(id);

        if (!deletedManager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        res.status(200).json({
            message: "Manager deleted successfully",
            manager: {
                _id: deletedManager._id,
                username: deletedManager.username,
                email: deletedManager.email,
                company_id: deletedManager.company_id,
                company_name: deletedManager.company_name,
            },
        });
    } catch (err) {
        console.error("Error deleting manager:", err.message);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Delete worker
const deleteWorker = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the worker by ID
        const deletedWorker = await Worker.findByIdAndDelete(id);

        if (!deletedWorker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        res.status(200).json({
            message: "Worker deleted successfully",
            worker: {
                _id: deletedWorker._id,
                name: deletedWorker.name,
                email: deletedWorker.email,
                company_id: deletedWorker.company_id,
                job_role: deletedWorker.job_role,
                department: deletedWorker.department,
            },
        });
    } catch (err) {
        console.error("Error deleting worker:", err.message);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Cron Job
const cronJob = async (req, res) => {
    res.status(200).json({ message: "Running" });
}

module.exports = {
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
};