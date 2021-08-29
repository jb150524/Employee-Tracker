const express = require('express');
//import and require mysql2//
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to Database//
const db = mysql.createConnection(
    host: 'localhost',
    //MySQL
);