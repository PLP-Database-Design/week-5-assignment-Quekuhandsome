// HTTP framework for handling requests
const express = require('express');
const app = express(); // isntance of express

// DBMS connection
const mysql =require('mysql2');

// cross origin resource sharing
const cors = require('cors');
// environment variable
const dotenv = require('dotenv');

// middleware
app.use(cors());
app.use(express.json());
dotenv.config();


// connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// check the connection
db.connect((err) => {
    // if no connection
    if (err) return console.log('Error connecting to the MYSQL:');
    
    // if connection works
    console.log("Connected to MYSQL id:", db.threadId);
});


// GET route
// Qustion 1 retrieving fro m the patients table 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 

app.get('/data', (req, res) => {
    // const sqlSelect = "SELECT patient_id , first_name, last_name, date_of_birth FROM patients";
    db.query("SELECT patient_id , first_name, last_name, date_of_birth FROM patients", (err, results) => {
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        }else{
        // display the 
            res.render('data', {results: results}) 
        }
    });
    // Question 2.Retrieving providers details
    db.query('SELECT first_name, last_name, provider_specialty FROM providers',(err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        }else{
            res.render('data', {results: results})
        }
    } )
    // Question3 .Retrieving all patients first name
    db.query('SELECT first_name FROM patients',(err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        }else{
            res.render('data', {results: results})
        }
    } )
    // Question .Retrieving all patients first name
    db.query('SELECT provider_+specialty FROM providers',(err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        }else{
            res.render('data', {results: results})
        }
    } )
}); 

// start the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);


    // sending message to the browser
    console.log(`Sending message to browser...`);
    app.get('/', (req, res) => {
        res.send('Hello from the server! server started Successfully');
    });
});


