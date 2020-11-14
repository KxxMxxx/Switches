// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (request, response) {
    response.json({
        status: 'API working',
        message: 'Welcome to Switches!',
    });
});

// Import switch controller
var switchController = require('./switch/controller');

// switch routes
router.route('/switches')
    .get(switchController.index)
    .post(switchController.new);

router.route('/switches/:name')
    .get(switchController.view)
    .patch(switchController.update)
    .put(switchController.update)
    .delete(switchController.delete);

// Export API routes
module.exports = router;
