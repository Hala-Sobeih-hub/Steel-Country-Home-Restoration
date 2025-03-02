import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; //provides access to the current location object.

import NavBarAdmin from "../Components/NavBar-Admin";
import Footer from "../Components/Footer";
import ServicesAdmin from "../components-services/ServicesAdmin";

export default function AdminServices() {
  const location = useLocation(); // Get the passed state
  const passedMessage = location.state?.message; // Extract message safely

  console.log(passedMessage);

  const [message, setMessage] = useState("");

  // Use useEffect to set the message only when component mounts
  useEffect(() => {
    if (passedMessage) {
      setMessage(passedMessage); // Set the passed message

      // Clear message after 5 seconds
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
    }
  }, [passedMessage]); // Run only when passedMessage changes

  return (
    <div>
      <NavBarAdmin />

      {/* Display message if it exists */}
      {message && (
        <div className="bg-green-200 text-green-800 p-4 mt-15 mb-4 rounded">
          {message}
        </div>
      )}

      <ServicesAdmin />
      <p>
        <br />
      </p>
      <Footer />
    </div>
  );
}
