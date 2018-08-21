const express  = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
// Express middleware

// timestamp and file logger middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
     next();
});

// maintenance middleware - nothing will run
// app.use((req, res, next) => {
//     res.render('down.hbs');
// });

// static middleware
app.use(express.static(__dirname + '/public'));

// Register a helper to replace dupicated currentYear in route renders below
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

// Register a helper to replace text with uppercase text
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


// set up HTTP route handlers - register a route handler with app.get()
app.get('/', (req, res) => {
// send some text/html
    // res.send('<h1>Hello Express!</h1>');
// send some JSON
    // res.send({
    //     name: 'Kim',
    //     likes: [
    //         'Biking', 'Cities'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page!',
        // currentYear: new Date().getFullYear()
    });
});

//  Add a new route
app.get('/about', (req, res) => {
    // send some text/html
    //  res.send('<h1>About Page</h1>');
        res.render('about.hbs', {
        pageTitle: 'About Page',
       
    });
});

//  Challenge - Add a new route Http handler /bad to send back json with error/Message
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request - unable to handle request '
    });
});

//  Use app.listen to bind the application to a port on our machine
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
