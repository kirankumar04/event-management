const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/authRoutes');
const EventRouter = require('./routes/eventRoutes');  // Assuming you have event routes to manage events.

require('dotenv').config();
require('./models/db'); // MongoDB connection

const PORT = process.env.PORT || 8080;

// Test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);  // Authentication Routes
app.use('/events', EventRouter);  // Event Routes (You will need to implement Event CRUD functionality)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
