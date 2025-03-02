import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const APIinquiries = "http://localhost:3000/api/inquiries";
const APIservices = "http://localhost:3000/api/services";

export default function Inquiry() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  //list of services required by the user
  const [services, setServices] = useState([]); //Create the services state variable as an empty array
  const [description, setDescription] = useState("");

  //list of services provided by the company
  const [servicesList, setServicesList] = useState([]);

  const [message, setMessage] = useState("");

  //Run this effect once when the page mounts
  useEffect(() => {
    //get the services (provided by the company) from the API
    fetch(APIservices)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setServicesList(data.result)) //set the services state variable
      .catch((error) => console.log(error)); //log any errors
  }, []);

  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    const newInquiry = {
      name,
      email,
      phone,
      address,
      services,
      description,
    };

    fetch(APIinquiries, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInquiry), //sending the newInquiry object as JSON
    })
      //This request returns a Promise, which resolves to a Response object.
      .then((response) => {
        //response.json() is asynchronous, and it returns another Promise that resolves with the parsed JSON body of the response (data).
        return response.json().then((data) => {
          console.log(response);
          //Check if the request was successful
          if (!response.ok) {
            //If the request was not successful, an error is thrown and This stops further execution of the .then() chain and goes directly to .catch()
            throw new Error(data.message || "Failed to add inquiry");
          }
          //If the response is successful, the parsed JSON data is returned to the next .then()
          return data;
        });
      })

      //This .then() runs only if the request was successful.
      .then((data) => {
        console.log(data);
        setMessage(data.message || "Inquiry added successfully!");

        // reset the form fields after successful submission
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setServices([]);
        setDescription("");
        setMessage("Inquiry submitted successfully!");

        // Navigate back to the previous page and pass the success message

        // Navigate only after showing the success message
        setTimeout(() => {
          navigate(-1, {
            state: { message: message || "Inquiry submitted successfully!" },
          });
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        //setMessage("Error adding inquiry");
        setMessage(error.message);
      });
  };

  useEffect(() => {
    console.log("Updated services:", services);
  }, [services]);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      //console.log(services);
      setServices([...services, e.target.value]);
      //console.log(services);
    } else {
      setServices(services.filter((item) => item !== e.target.value));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {/* <div className="grid grid-cols-2 justify-center items-center min-h-screen bg-gray-100"> */}
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Get Free Estimate
          </h2>

          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Name Field */}
            <label className="text-gray-700 font-medium text-right">Name</label>
            <input
              type="text"
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email Field */}
            <label className="text-gray-700 font-medium text-right">
              Email
            </label>
            <input
              type="email"
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Phone Field */}
            <label className="text-gray-700 font-medium text-right">
              Phone
            </label>
            <input
              type="tel"
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your phone"
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Address Field */}
            <label className="text-gray-700 font-medium text-right">
              Address
            </label>
            <input
              type="text"
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your address"
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* Service Field */}
            <label className="text-gray-700 font-medium text-right">
              Service
            </label>
            <div className="col-span-2 flex flex-col space-y-2">
              {servicesList.map((service) => (
                <label
                  key={service._id}
                  className="flex items-center space-x-2 "
                >
                  <input
                    type="checkbox"
                    value={service.name}
                    className="w-5 h-5 text-blue-500"
                    onChange={(e) => {
                      // Handle service selection logic here
                      handleCheckboxChange(e);
                      console.log(`Checked: ${service.name}`);
                    }}
                  />
                  <span className="text-gray-700">{service.name}</span>
                </label>
              ))}
            </div>

            {/* Description Field */}
            <label className="text-gray-700 font-medium text-right">
              Description
            </label>
            <textarea
              className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter service description"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            {/* Buttons */}
            <div className="flex justify-around mt-6">
              <button
                type="submit"
                className="w-1/3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-1/3 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => navigate(-1)} // Navigates back
              >
                Back
              </button>
            </div>
            {message && (
              <p className="confirmAdd text-red-500 text-xl p-4 text-center">
                {message}
              </p>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
