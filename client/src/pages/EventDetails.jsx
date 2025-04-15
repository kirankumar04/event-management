import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, getEvents } from '../services/eventService';
import { FaMapMarkerAlt, FaUsers, FaExclamationTriangle, FaRegBookmark } from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [userRegistration, setUserRegistration] = useState(null);
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    const fetchEventAndEvents = async () => {
      try {
        const eventData = await getEventById(id);
        if (eventData && eventData.event) {
          setEvent(eventData.event);
        } else {
          navigate('/');
        }
        const allEventsData = await getEvents();
        setEvents(allEventsData);
      } catch (error) {
        console.error('Error fetching event:', error);
        navigate('/');
      }
    };
    fetchEventAndEvents();
  }, [id, navigate]);

  const handleBookmark = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Please log in to bookmark this event.');
      return;
    }

    const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (!existingBookmarks.includes(event._id)) {
      existingBookmarks.push(event._id); // Only store the eventId
      localStorage.setItem('bookmarks', JSON.stringify(existingBookmarks));
      alert('Event bookmarked successfully!');
    } else {
      alert('This event is already bookmarked.');
    }
  };

  const handleRegister = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Please log in to register.');
      return;
    }

    const registrationData = {
      eventId: event._id,
      status: event.participantsCount < event.capacity
        ? 'registered'
        : `wt${event.participantsCount - event.capacity + 1}`,
    };

    if (event.participantsCount >= event.capacity) {
      // Add to waiting list
      const waitingListIndex = event.participantsCount - event.capacity + 1;
      registrationData.status = `wt${waitingListIndex}`;

      const existingWaitingList = JSON.parse(localStorage.getItem(`waitingList-${event._id}`)) || [];
      const updatedWaitingList = [...existingWaitingList, registrationData];
      setWaitingList(updatedWaitingList);
      localStorage.setItem(`waitingList-${event._id}`, JSON.stringify(updatedWaitingList));
    } else {
      // Add to registered events
      const existingRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
      if (!existingRegistrations.includes(event._id)) {
        existingRegistrations.push(event._id); // Store only the eventId
        localStorage.setItem('registrations', JSON.stringify(existingRegistrations));
        setUserRegistration(registrationData);
      } else {
        alert('You are already registered for this event.');
        return;
      }
    }

    // Update participants count locally and in localStorage
    const updatedEvent = { ...event, participantsCount: event.participantsCount + 1 };
    setEvent(updatedEvent);

    alert('You have successfully registered!');
  };

  if (!event) return <div>Loading...</div>;

  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = new Date(event.date).toLocaleTimeString();
  const relatedEvents = events.filter((e) => e.category === event.category && e.id !== id);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Event Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40 flex items-center px-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight mb-4">{event.title}</h1>
            <p className="text-white/70 mb-4">{event.description}</p>
            <div className="flex gap-4 text-sm text-white mb-4">
              <div className="bg-white/10 p-4 rounded-lg flex items-center gap-4">
                <span className="text-2xl font-bold">{formattedDate.split('/')[1]}</span>
                <div>
                  <p className="text-white/80 text-xs">{formattedDate}</p>
                  <p className="text-white/60 text-xs">{formattedTime}</p>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg flex items-center gap-2">
                <FaMapMarkerAlt className="text-lg" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Registration */}
            {new Date() < new Date(event.registrationClosesAt) && (
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md text-black"
                />
                <div className="flex gap-2">
                  <select className="px-2 py-2 rounded-md text-black">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="px-4 py-2 rounded-md text-black"
                  />
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <button
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
                onClick={handleRegister}
              >
                {event.participantsCount < event.capacity ? 'Register' : 'Registration Closed'}
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
                onClick={handleBookmark}
              >
                <FaRegBookmark />
                Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      {relatedEvents.length > 0 && (
        <div className="mt-16 px-10">
          <h2 className="text-3xl font-semibold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedEvents.map((relatedEvent) => (
              <div
                key={relatedEvent._id} 
                className="bg-gray-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all relative"
              >
                <img
                  src={relatedEvent.image}
                  alt={relatedEvent.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{relatedEvent.title}</h3>
                  <p className="text-gray-300 mb-4">{relatedEvent.description.slice(0, 100)}...</p>
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => navigate(`/events/${relatedEvent._id}`)} 
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
