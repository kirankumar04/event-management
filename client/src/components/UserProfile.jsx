import React from 'react';

const UserProfile = ({ user, onEdit }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User  Profile</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <p className="text-gray-900">{user.name}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Registered Events:</label>
                <ul className="list-disc pl-5">
                    {user.registeredEvents.map(event => (
                        <li key={event.id} className="text-gray-900">{event.title}</li>
                    ))}
                </ul>
            </div>
            <button
                onClick={onEdit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Edit Profile
            </button>
        </div>
    );
};

export default UserProfile;