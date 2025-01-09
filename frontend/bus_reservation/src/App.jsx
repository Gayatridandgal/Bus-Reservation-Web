import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [buses, setBuses] = useState([]);
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [selectedBus, setSelectedBus] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [updateBookingId, setUpdateBookingId] = useState("");
  const [deleteBookingId, setDeleteBookingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5006/buses");
      setBuses(response.data);
    } catch (err) {
      console.error("Error fetching buses:", err.message);
      setError("Failed to load buses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!username || !phonenumber || !selectedBus || !seats || !date) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5006/book", {
        username,
        phonenumber,
        busId: selectedBus,
        seats,
        date,
      });
      setMessage(`Booking successful! Booking ID: ${response.data.bookingId}`);
      setError("");
    } catch (err) {
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBooking = async () => {
    if (!updateBookingId) {
      setError("Please provide a booking ID.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5006/bookings/${updateBookingId}`, {
        username,
        phonenumber,
        busId: selectedBus,
        seats,
        date,
      });
      setMessage("Booking updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!deleteBookingId) {
      setError("Please provide a booking ID.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5006/bookings/${deleteBookingId}`);
      setMessage("Booking deleted successfully!");
      setError("");
    } catch (err) {
      setError("Failed to delete booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-blue-600"
            >
              Bus Reservation System
            </motion.div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Home</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">About</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        className="relative bg-blue-600 h-99"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Book Your Journey</h1>
            <p className="text-xl md:text-2xl opacity-80">Safe, comfortable, and reliable bus travel</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700"
              >
                {message}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Ticket</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Bus</label>
                  <select
                    value={selectedBus}
                    onChange={(e) => setSelectedBus(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">--Select--</option>
                    {buses.map((bus) => (
                      <option key={bus.id} value={bus.id}>
                        {bus.source} to {bus.destination} ({bus.type}) - ₹{bus.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                    <input
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      min="1"
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  disabled={isLoading}
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Book Tickets"}
                </motion.button>
              </motion.div>

              {/* Manage Bookings */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Booking</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={updateBookingId}
                      onChange={(e) => setUpdateBookingId(e.target.value)}
                      placeholder="Enter booking ID to update"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateBooking}
                      disabled={isLoading}
                      className="w-full py-3 px-6 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? "Processing..." : "Update Booking"}
                    </motion.button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Delete Booking</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={deleteBookingId}
                      onChange={(e) => setDeleteBookingId(e.target.value)}
                      placeholder="Enter booking ID to delete"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteBooking}
                      disabled={isLoading}
                      className="w-full py-3 px-6 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? "Processing..." : "Delete Booking"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Providing safe and comfortable bus travel experiences across the country.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition-colors">Home</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">About</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@busreservation.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Travel Street</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;