let apiRoutes = require('./api-routes');
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');

// Initialize app
let app = express();

app.use('/api', apiRoutes);

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

// Returns middleware (bodyParser) that only parses JSON
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('monodb://localhost/switches', {
    useNewUrlParser: true,
});

// Set Mongoose connection variable
var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello to Switches!'));

// Launch app and listen to specified port
app.listen(port, function() {
    console.log("Running Switches on port " + port);
});
