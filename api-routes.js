// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (request, response) {
    response.json({
        status: 'API working',
        message: 'Welcome to Switches!',
    });
});

// Export API routes
module.exports = router;
