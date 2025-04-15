import React from 'react';
import EventCard from './Eventcard';

const EventGrid = ({ filteredEvents, isInWishlist, toggleWishlist, toggleRegistration, isRegistered }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <EventCard
          key={event._id} 
          id={event._id}
          image={event.image}
          category={event.category}
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
          location={event.location}
          capacity={event.capacity}
          participantsCount={event.participantsCount}
          toggleWishlist={() => toggleWishlist(event._id)} 
          isInWishlist={isInWishlist(event._id)} 
          toggleRegistration={() => toggleRegistration(event._id)} 
          isRegistered={isRegistered(event._id)}
        />
      ))}
    </div>
  );
};

export default EventGrid;
