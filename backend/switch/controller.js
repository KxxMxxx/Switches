// Import Switch model
var KeySwitch = require('./model');

// Handle index actions
exports.index = function (request, response) {
    KeySwitch.get(function (error, switches) {
        if (error) {
            response.json({
                status: "error",
                message: error,
            });
        } else {
            response.json({
                status: "success",
                message: "Switches retrieved successfully",
                data: switches
            });
        }
    });
};

// Handle create switch actions
// POST /api/switches
exports.new = function (request, response) {
    var keySwitch = new KeySwitch();
    keySwitch.name = request.body.name;
    keySwitch.type = request.body.type;
    keySwitch.actuation = request.body.actuation;
    keySwitch.bottom = request.body.bottom;
    keySwitch.travel = request.body.travel;

    // Save the switch and check for errors
    keySwitch.save(function (error) {
        if (error) {
            response.json(error);
        } else {
            response.json({
                message: "New switch added",
                data: keySwitch,
            });
        }
    });
};

// Handle view switch info
// GET /api/switches/{name}
exports.view = function (request, response) {
    KeySwitch.findOne({
        name: request.params.name
    }, function (error, keySwitch) {
        if (error) {
            response.send(error);
        } else {
            response.json({
                message: request.params.name + " has been found",
                data: keySwitch
            });
        }
    });
};

// Handle update switch info
// PUT /api/switches/{name}
exports.update = function (request, response) {
    KeySwitch.findOne({
        name: request.params.name
    }, function (error, keySwitch) {
        if (error) {
            response.send(error);
        } else {
            keySwitch.name = request.body.name;
            keySwitch.type = request.body.type;
            keySwitch.actuation = request.body.actuation;
            keySwitch.bottom = request.body.bottom;
            keySwitch.travel = request.body.travel;

            // save the switch and check for errors
            keySwitch.save(function (error) {
                if (error) {
                    response.json(error);
                } else {
                    response.json({
                        message: request.body.name + " has been updated",
                        data: keySwitch
                    });
                }
            });
        }
    });
};

// Handle delete contact
// DELETE /api/switches/{name}
exports.delete = function (request, response) {
    KeySwitch.remove({
        name: request.params.name
    }, function (error, keySwitch) {
        if (error) {
            response.send(error);
        } else {
            response.json({
                status: "success",
                message: "Switch deleted",
            });
        }
    });
};
