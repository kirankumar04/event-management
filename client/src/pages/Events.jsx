import React, { useEffect, useState } from 'react';
import { getEventById } from '../services/eventService'; // Assuming this is your API function
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookmarksAndRegistrationsPage = () => {
  const navigate = useNavigate();
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState('bookmarked'); // 'bookmarked' or 'registered'

  // Fetch Bookmarked Events
  useEffect(() => {
    const fetchBookmarkedEvents = async () => {
      const bookmarkedEventIds = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const eventsData = await Promise.all(
        bookmarkedEventIds.map((eventId) => getEventById(eventId))
      );
      setBookmarkedEvents(eventsData.map((data) => data.event)); // Assuming the data structure
    };

    const fetchRegisteredEvents = async () => {
      const registeredEventIds = JSON.parse(localStorage.getItem('registrations')) || [];
      const eventsData = await Promise.all(
        registeredEventIds.map((eventId) => getEventById(eventId))
      );
      setRegisteredEvents(eventsData.map((data) => data.event)); // Assuming the data structure
    };

    fetchBookmarkedEvents();
    fetchRegisteredEvents();
  }, []);

  // Render Event Card
  const renderEvent = (event) => (
    <div key={event._id} className="bg-gray-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all relative">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-300 mb-4">{event.description.slice(0, 100)}...</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaMapMarkerAlt />
          <span>{event.location}</span>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          onClick={() => navigate(`/events/${event._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );

  // Handle category switching (Bookmarks or Registered)
  const handleCategorySwitch = (category) => {
    setActiveCategory(category);
  };

  // Determine which set of events to display
  const eventsToDisplay = activeCategory === 'bookmarked' ? bookmarkedEvents : registeredEvents;

  return (
    <div className="min-h-screen bg-black text-white font-sans px-10 py-16">
      <h1 className="text-4xl font-extrabold mb-6">Your Events</h1>

      {/* Tab for switching between Bookmarked and Registered */}
      <div className="flex gap-8 mb-8">
        <button
          className={`${
            activeCategory === 'bookmarked' ? 'bg-blue-600' : 'bg-gray-700'
          } text-white px-6 py-2 rounded-lg`}
          onClick={() => handleCategorySwitch('bookmarked')}
        >
          Bookmarked Events
        </button>
        <button
          className={`${
            activeCategory === 'registered' ? 'bg-blue-600' : 'bg-gray-700'
          } text-white px-6 py-2 rounded-lg`}
          onClick={() => handleCategorySwitch('registered')}
        >
          Registered Events
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventsToDisplay.length > 0 ? (
          eventsToDisplay.map((event) => renderEvent(event))
        ) : (
          <p className="text-gray-500">No events to display.</p>
        )}
      </div>
    </div>
  );
};

export default BookmarksAndRegistrationsPage;
