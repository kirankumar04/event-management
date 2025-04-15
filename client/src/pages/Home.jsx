import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import EventGrid from '../components/EventGrid';
import Pagination from '../components/Pagination';
import SearchAndFilters from '../components/SearchAndFilters';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const eventsPerPage = 6;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();

    // Load wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleWishlist = (id) => {
    const updatedWishlist = wishlist.includes(id)
      ? wishlist.filter((itemId) => itemId !== id)
      : [...wishlist, id];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (id) => wishlist.includes(id);

  const filteredEventsAll = events.filter((event) => {
    const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const paginatedEvents = filteredEventsAll.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const totalPages = Math.ceil(filteredEventsAll.length / eventsPerPage);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="p-8 max-w-7xl mx-auto">
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={['Workshop', 'Conference', 'Bootcamp']}
        />
        <EventGrid
          filteredEvents={paginatedEvents}
          isInWishlist={isInWishlist}
          toggleWishlist={toggleWishlist}
          toggleRegistration={() => {}}
          isRegistered={() => {}}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
