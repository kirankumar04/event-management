const EventModel = require('../models/event');
const UserModel = require('../models/user'); // Assuming you have a User model defined in models/user.js
const mongoose = require('mongoose');
// GET all events
const getAllEvents = async (req, res) => {
    try {
      const events = await EventModel.find();
      return res.status(200).json(events); // Ensure this returns just the array of events
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching events' });
    }
  };

// GET single event by ID
const getEventById = async (req, res) => {
    const { id } = req.params; // Get the event ID from the route params

    try {
        const event = await EventModel.findById(id); // Fetch event by ID from the database
        if (!event) {
            return res.status(404).json({
                message: 'Event not found',
                success: false
            });
        }
        res.status(200).json({
            success: true,
            event
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const { image, title, category, date, registrationClosesAt, status, participantsCount, capacity, description, location } = req.body;

        // Create a new event object
        const newEvent = new EventModel({
            image,
            title,
            category,
            date,
            registrationClosesAt,
            status,
            participantsCount,
            capacity,
            description,
            location
        });

        // Save the event to the database
        await newEvent.save();

        res.status(201).json({
            message: 'Event created successfully',
            success: true,
            event: newEvent
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

// Bookmark an event
const bookmarkEvent = async (req, res) => {
    const { userId, eventId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).send({ error: 'Invalid user or event ID' });
    }
  
    try {
      // Find the user and event
      const user = await UserModel.findById(userId);
      const event = await EventModel.findById(eventId);
  
      if (!user || !event) {
        return res.status(404).send({ error: 'User or Event not found' });
      }
  
      // Check if event is already bookmarked
      if (user.bookmarks.includes(eventId)) {
        return res.status(400).send({ error: 'Event already bookmarked' });
      }
  
      // Add event to bookmarks
      user.bookmarks.push(eventId);
      await user.save();
  
      res.status(200).send({ message: 'Event bookmarked successfully' });
    } catch (error) {
      console.error('Error bookmarking event:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };
  
  // Register for an event
  const registerEvent = async (req, res) => {
    const { userId, eventId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).send({ error: 'Invalid user or event ID' });
    }
  
    try {
      // Find the user and event
      const user = await UserModel.findById(userId);
      const event = await EventModel.findById(eventId);
  
      if (!user || !event) {
        return res.status(404).send({ error: 'User or Event not found' });
      }
  
      // Check if the user is already registered for this event
      if (user.registeredEvents.includes(eventId)) {
        return res.status(400).send({ error: 'User already registered for this event' });
      }
  
      // Check if the event is full
      if (event.participantsCount >= event.capacity) {
        return res.status(400).send({ error: 'Event is already full' });
      }
  
      // Add event to registeredEvents and update participantsCount
      user.registeredEvents.push(eventId);
      await user.save();
  
      event.participantsCount += 1; // Increment the participants count
      await event.save();
  
      res.status(200).send({ message: 'User registered for the event successfully' });
    } catch (error) {
      console.error('Error registering for event:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };

module.exports = { getAllEvents, getEventById, createEvent, bookmarkEvent, registerEvent };
