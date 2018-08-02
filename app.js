// Todo 1- we'll use express
const express = require('express');

// Todo 2- Create an instance of express
const app = express();

// Todo 7- We'll use Mongo Db
// npm install mongojs
const mongojs = require('mongojs');

// Todo 8- create database instance
const database = mongojs('node_express_rest_mongo', ['members']);

// Todo 10- We use morgan
const morgan = require('morgan');
// app.use(morgan('combined'));
app.use(morgan('short'));

// Todo 11- Body Parser
const bodyParser = require('body-parser');
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Todo 12- Express Validator
const expressValidator = require('express-validator');

// Todo 13 - Path
const path = require('path');

// Todo 14-View Engine
app.set('view engine', 'ejs');
// we have to define which folder we will use
app.set('views', path.join(__dirname, 'views'));


// Todo 4- Main Page Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Customers List...'
        // people: docs
    });
    // res.send('Hello World');
    // res.end();
});

// Todo 6- CRUD Routes
// List All
app.get('/list', (req, res) => {
    database.members.find((err, docs) => {
        // console.log(docs);
        res.json(docs);


    });
});
// Create From Link
app.get('/create', (req, res) => {
    // At the beginning we use static data, then we'll use form and get data from form
    var newMember = {
        first_name: "Ritchie",
        last_name: "Blackmore",
        instruments: "Guitars"
    };

    database.members.insert(newMember, (err, result) => {
        if (err) {
            console.log('Error Occured' + err.message)
        }
    });

    res.redirect('/list');
});
// Create From Form
app.post('/create', (req, res) => {
    // At the beginning we use static data, then we'll use form and get data from form
    var newMember = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        instruments: req.body.instruments
    };

    database.members.insert(newMember, (err, result) => {
        if (err) {
            console.log('Error Occured' + err.message)
        }
    });

    res.redirect('/list');
});
// Read
app.get('/read/:id', (req, res) => {
    //5b6231b70c71fb2ce4d74ad5
    //5b6216f49e61db40ecf07e00
    // im using static id for test purpose
    let memberId = '5b6216f49e61db40ecf07e00';
    // let memberId = req.params.id;

    var queryRead = {_id: mongojs.ObjectID(memberId)};
    database.members.find(queryRead, (err, obj) => {
        if (err) {
            console.log('Error : ' + err.message)
        }
        res.send(obj);
    })


});
// Update
app.get('/update/:id', (req, res) => {

    let newFirstName = "Ronie James";
    let newLastName = "Dio";
    let newInstruments = "Vocal";

    // im using static id for test purpose
    let memberId = '5b62e78e2f1c3f32f8cfb483';
    // let memberId = req.params.id;

    var queryRead = {_id: mongojs.ObjectID(memberId)};

    database.members.find(queryRead, (err, obj) => {
        if (err) {
            console.log('Error : ' + err.message)
        }
        // update values coming from database
        newFirstName = newFirstName + obj[0].first_name;
        newLastName = newLastName + obj[0].last_name;
        newInstruments = newInstruments + obj[0].instruments;

        // update new values into database
        database.members.update(queryRead, {
            first_name: newFirstName,
            last_name: newLastName,
            instruments: newInstruments
        });

    });
    // redirect List page after update
    res.redirect('/list');

});

// Delete
app.get('/delete/:id', (req, res) => {
    //5b6216f49e61db40ecf07e00
    // im using static id for test purpose
    let memberId = '5b62ffe1e5d4e21c54c554cb';
    // let memberId = req.params.id;

    var queryRemove = {_id: mongojs.ObjectID(memberId)};
    database.members.remove(queryRemove);

    res.redirect('/list');

});
// NotFound
app.get('/*', (req, res) => {
    res.send('What is wrong with you?');
});


// Todo 3- Create server and Run
app.listen(3000, (req, res) => {
    console.log('Server up and running on Port 3000');
});


/* Todo 5- Create Database and Colelctions
MongoDB node_express_rest_mongo
Collection members
Sample Data
{
        "_id" : ObjectId("5b6216f49e61db40ecf07e00"),
        "first_name" : "Ronnie James",
        "last_name" : "Dio",
        "instruments" : "vocal"
}
 */

/*
Todo 9- Will be added
    1-body-parser
    2-ejs
    3-express-validator
    4-morgan

 */