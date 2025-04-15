const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Event Schema
const EventSchema = new Schema({
    image: {
        type: String, // Store the URL of the event image
        required: true,
    },
    title: {
        type: String, // Event title (e.g., "Node.js Workshop")
        required: true,
        trim: true,
    },
    category: {
        type: String, // Category of the event (e.g., "Workshop", "Conference")
        required: true,
    },
    date: {
        type: Date, // Date of the event
        required: true,
    },
    registrationClosesAt: {
        type: Date, // The date when registration closes
        required: true,
    },
    status: {
        type: String, // Current status of the event
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], // Allowing for status management
        default: 'upcoming', // Default to upcoming if not specified
    },
    participantsCount: {
        type: Number, // Number of registered participants
        default: 0, // Default to 0 if no participants are registered
    },
    capacity: {
        type: Number, // Maximum number of participants for the event
        required: true,
    },
    description: {
        type: String, // Description of the event
        required: true,
    },
    location: {
        type: String, // Event location (e.g., "Online", "New York City", etc.)
        required: true,
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the model
const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
