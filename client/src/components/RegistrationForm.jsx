import React, { useState } from 'react';

const RegistrationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Event ID:</label>
                <input
                    type="text"
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full"
                />
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;