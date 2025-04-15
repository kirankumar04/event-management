import React from 'react';

const Banner = () => {
    return (
        <div className="bg-gray-100 text-black py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">
                        Welcome to JByte
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl">
                        Your one-stop solution for organizing and attending events.
                    </p>
                    <div className="mt-8">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-full px-6 py-3 cursor-pointer">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;