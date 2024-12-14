const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRouters = require('./routers/userRouters');

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

// Json and Cors (http and header handlers)
app.use(express.json({extended: false}));
app.use(cors({origin: "*", Credential: true, methods: ["GET", "POST", "PUT", "DELETE"]}));

// Database and server listening
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, process.env.HOST , () => {
            console.log(`The Database was Connected Successfully\nThe Server was Listening\nhttp://localhost:${PORT}`);
        });
    })
    .catch((e) => console.log(e.message));

// Routers Middleware
app.use('/api/users', userRouters);

// Deployed Link: https://post-seva-server.onrender.com