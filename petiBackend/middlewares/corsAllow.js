//  defining routes to allow access cross origin of the API
const corsAllowed = {
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsAllowed;