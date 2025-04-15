import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventCard = ({
  id,
  image,
  category,
  title,
  description,
  date,
  time,
  location,
  capacity,
  participantsCount,
}) => {
  const [isInBookmarks, setIsInBookmarks] = useState(false);

  // Check if the event is bookmarked when the component mounts
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const isBookmarked = bookmarks.includes(id); // Check if the event ID is in bookmarks
    setIsInBookmarks(isBookmarked);
  }, [id]);

  const progressPercent = Math.round((participantsCount / capacity) * 100);

  const displayTime = time
    ? time
    : new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Time not available';

  const isLongDescription = description.length > 80;
  const shortDescription = isLongDescription
    ? description.slice(0, 120) + '...'
    : description;

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let updatedBookmarks;

    if (isInBookmarks) {
      // Remove the event from bookmarks
      updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== id);
    } else {
      // Add the event to bookmarks
      updatedBookmarks = [...bookmarks, id];
    }

    // Update localStorage and set the bookmark state
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsInBookmarks(!isInBookmarks);
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <img src={image} alt={title} className="w-full p-4 h-64 object-cover rounded-t-xl" />

      <div className="p-6 flex flex-col justify-between text-white">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full font-semibold">
            {category}
          </span>
          <div onClick={toggleBookmark} className="text-xl cursor-pointer transition-colors">
            {isInBookmarks ? (
              <FaBookmark className="text-blue-400" />
            ) : (
              <FaRegBookmark className="text-gray-400 hover:text-blue-400" />
            )}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>

        <p className="text-gray-300 mb-4">
          {shortDescription}
          {isLongDescription && (
            <Link to={`/events/${id}`} className="text-blue-400 ml-1 hover:underline">
              Read more
            </Link>
          )}
        </p>

        <div className="flex gap-4 text-sm text-gray-400 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />{' '}
            {new Date(date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500" /> {displayTime}
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" /> {location}
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">{`${participantsCount}/${capacity} spots filled`}</p>
        </div>

        <div className="text-center">
          <Link
            to={`/events/${id}`}
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
