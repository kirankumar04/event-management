// services/eventService.js

const API_URL = 'http://localhost:5000/events'; // Update the backend URL if needed

// Fetch all events
export const getEvents = async () => {
  try {
    const response = await fetch(API_URL);  // Use fetch to get all events
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;  // Return the events data
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;  // Propagate the error
  }
};

// Fetch a single event by ID (for EventDetails page)
export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);  // Use fetch to get a single event by ID
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;  // Return the event data
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;  // Propagate the error
  }
};

// src/services/eventService.js

// Service for bookmarking an event
export const bookmarkEvent = async (userId, eventId) => {
  try {
    const response = await fetch(`${API_URL}/bookmark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        eventId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to bookmark event');
    }

    const data = await response.json();
    return data; // Return success message or data
  } catch (error) {
    console.error('Error bookmarking event:', error);
    throw new Error(error.message || 'Error occurred while bookmarking event');
  }
};

// Service for registering an event
export const registerEvent = async (userId, eventId) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        eventId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register for event');
    }

    const data = await response.json();
    return data; // Return success message or data
  } catch (error) {
    console.error('Error registering for event:', error);
    throw new Error(error.message || 'Error occurred while registering for event');
  }
};
