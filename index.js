const express = require('express');
const path = require('path');
require("dotenv").config();
const dbConnection = require('./utils/dbConnection');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;
const rootRoute = require('./routes/rootRoute');
const doctorRoute = require('./routes/doctor');
dbConnection();
app.use(rootRoute);
app.use(doctorRoute);




app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Server is running on PORT", PORT);
});