let apiRoutes = require('./api-routes');
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let serverless = require('serverless-http');
let cors = require('cors');

// Initialize app
let app = express();

app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

// Returns middleware (bodyParser) that only parses JSON
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://Me:0yMdx7SB2eJ8MwVM@cs3219-otot-b.xcwlm.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

// Set Mongoose connection variable
var db = mongoose.connection;

if (db) {
    console.log("DB connected successfully");
} else {
    console.log("Error connecting DB");
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello to Switches!'));

app.use('/api', apiRoutes);

// Launch app and listen to specified port
app.listen(port, function() {
    console.log("Running Switches on port " + port);
});

// Export app for testing
module.exports = app;
module.exports.handler = serverless(app);
