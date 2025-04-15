import React from 'react';
import EventCard from './Eventcard';

const Wishlist = ({ wishlistEvents, toggleWishlist, isInWishlist, toggleRegistration, isRegistered }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistEvents.length > 0 ? (
                wishlistEvents.map(event => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        image={event.image}
                        category={event.category}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        time={event.time}
                        location={event.location}
                        capacity={event.capacity}
                        filled={event.filled}
                        toggleWishlist={() => toggleWishlist(event.id)}
                        isInWishlist={isInWishlist(event.id)}
                        toggleRegistration={() => toggleRegistration(event.id)}
                        isRegistered={isRegistered(event.id)}
                    />
                ))
            ) : (
                <p className="text-gray-600">Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;