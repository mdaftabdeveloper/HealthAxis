const express = require('express');
const path = require('path');
const session = require('express-session');
require("dotenv").config();
const dbConnection = require('./utils/dbConnection');
const app = express();

// Use JSON and URL-encoded with higher limits if you still need them
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

// Routes
const rootRoute = require('./routes/rootRoute');
const doctorRoute = require('./routes/doctor');
const patientRoute = require('./routes/patient');
const receptionistRoute = require('./routes/receptionist');
dbConnection();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10,
        httpOnly: true,
        secure: false
    }
}));

app.use(rootRoute);
app.use(doctorRoute);
app.use(patientRoute);
app.use(receptionistRoute);
app.listen(PORT, '0.0.0.0', (err) => {
    if (err)
        console.log(err);
    else
        console.log("Server is running on PORT", PORT);
});
