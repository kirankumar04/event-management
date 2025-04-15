const { getAllEvents, getEventById, createEvent } = require('../controllers/eventController');
const { bookmarkEvent, registerEvent } = require('../controllers/eventController'); // Import the controller

const router = require('express').Router();

// GET all events
router.get('/', getAllEvents);

// GET a single event by ID
router.get('/:id', getEventById);

// POST route for creating a new event
router.post('/create', createEvent);

// Route to bookmark an event
router.post('/bookmark', bookmarkEvent);

// Route to register for an event
router.post('/register', registerEvent);

module.exports = router;
