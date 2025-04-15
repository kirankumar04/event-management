import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegBookmark, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import '../App.css'; // Optional: Add custom styles if needed

const EventCard = ({ image, category, title, description, date, time, location, isLarge }) => {
  return (
    <div className={`bg-[#f9f9fb] rounded-2xl shadow-md overflow-hidden ${isLarge ? 'flex flex-row h-[300px]' : 'flex flex-col h-full'}`}>
      <img
        src={image}
        alt={title}
        className={`${isLarge ? 'w-1/3 h-full object-cover' : 'w-full h-48 object-cover'} ${isLarge ? '' : 'rounded-t-2xl'}`}
      />
      <div className={`p-4 flex flex-col justify-between ${isLarge ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
          <FaRegBookmark className="text-lg text-gray-500 hover:text-black cursor-pointer" />
        </div>
        <h2 className={`font-semibold ${isLarge ? 'text-2xl' : 'text-lg'} text-gray-900 mb-1`}>
          {title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex gap-2 text-sm text-gray-600 flex-wrap mt-auto">
          <div className="flex items-center gap-1">
            <FaCalendarAlt /> {date}
          </div>
          <div className="flex items-center gap-1">
            <FaClock /> {time}
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt /> {location}
          </div>
        </div>
      </div>
    </div>
  );
};

const dummyEvents = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
    title: 'Design Thinking Essentials',
    category: 'Workshop',
    description: 'Empower yourself to tackle complex challenges through a human-centered approach.',
    date: '2025-04-15',
    time: '10:00 AM',
    location: 'Pole, doe Marten',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
    title: 'Future of AI 2026',
    category: 'Seminar',
    description: 'Explore future trends in artificial intelligence and ethical challenges.',
    date: '2025-04-15',
    time: '1:00 PM',
    location: 'Pole, doe Marten',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
    title: 'Sustainability in Design',
    category: 'Seminar',
    description: 'Learn how to integrate sustainability into your design process.',
    date: '2025-04-15',
    time: '3:00 PM',
    location: 'Eco Center, Hall B',
  },
];

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-04-15'));

  const formatDate = (date) => date.toLocaleDateString('en-CA');

  const filteredEvents = dummyEvents.filter(
    (event) => event.date === formatDate(selectedDate)
  );

  return (
    <div className="p-8 bg-[#f0f2f5] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Calendar */}
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Pick a Date</h2>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileClassName="react-calendar-tile"
            />
          </div>
        </div>

        {/* Events Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Events on {selectedDate.toDateString()}
          </h2>

          {filteredEvents.length > 0 ? (
            <>
              {/* Featured Large Card */}
              <EventCard {...filteredEvents[0]} isLarge={true} />

              {/* Grid Cards */}
              {filteredEvents.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredEvents.slice(1).map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600 text-sm">No events scheduled for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
