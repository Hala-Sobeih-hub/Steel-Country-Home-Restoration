import React, { useEffect, useState } from "react"; // Import the useEffect and useState hooks
import { useNavigate } from "react-router-dom";
import "./InquiriesAdmin.css";

const API = "http://localhost:3000/api/inquiries";

export default function InquiriesAdmin() {
  //create an inquiries state variable
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState(""); // Create the message state variable
  // const [showForm, setShowForm] = useState(false); //to display the chosen inquiry
  // const [index, setIndex] = useState(); //to pass the index of the chosen inquiry
  const [selectedInquiry, setSelectedInquiry] = useState(null); // Store the selected inquiry

  useEffect(() => {
    //get the inquiries from the API
    fetch(API)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setInquiries(data.result)) //set the inquiries state variable
      .catch((error) => consle.log(error)); //log any errors
  }, [inquiries]);

  const deleteInquiry = (index) => {
    fetch(`${API}/${inquiries[index]._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `${token}`, // Send the token in the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.log(error));
  };

  const updateInquiry = (index) => {};
  const displayInquiry = (index) => {
    fetch(`${API}/${inquiries[index]._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `${token}`, // Send the token in the Authorization header
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => console.log(data.result)) //set the services state variable
      .catch((error) => console.log(error)); //log any errors
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-8">
        Inquiries - Admin Dashboard
      </h1>

      <div className="inquiries-container">
        <table className="inquiries-table" /*border-1 place-self-center*/>
          <thead>
            <tr
              className="table-title" /*place-self-center text-2xl table-auto border border-gray-500*/
            >
              <th
                className="serviceId" /*border-gray-300"*/
                width={100}
                align="center"
              >
                ID
              </th>
              <th className="inquiry-name" /*border-gray-300"*/ width={100}>
                Name
              </th>
              <th className="inquiry-email" width={150}>
                Email
              </th>
              <th className="inquiry-phone" width={150}>
                Phone
              </th>
              <th className="inquiry-address" width={250}>
                Address
              </th>
              <th className="inquiry-service" width={150}>
                Service
              </th>
              <th className="inquiry-service" width={150}>
                Status
              </th>
              <th className="actions" width={250}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry, index) => (
              <tr
                key={inquiry._id}
                className="inquiryId border border-gray-400"
                onClick={() => setSelectedInquiry(inquiry)} // Open modal with inquiry details
              >
                <td className="inquiryId" align="center">
                  {index + 1}
                </td>
                <td className="inquiry-name text-center border border-gray-400">
                  {inquiry.name}
                </td>
                <td className="inquiry-email text-center border border-gray-400">
                  {inquiry.email}
                </td>
                <td className="inquiry-phone text-center border border-gray-400">
                  {inquiry.phone}
                </td>
                <td className="inquiry-address text-center border border-gray-400">
                  {inquiry.address}
                </td>
                <td className="inquiry-service border border-gray-400 p-4">
                  {inquiry.service}
                </td>
                <td className="inquiry-service border border-gray-400 p-4">
                  {inquiry.status}
                </td>

                <td
                  className="actions" /*flex justify-between items-center p-4*/
                >
                  {/* <button
                    className="rounded-lg p-2 bg-[#4a9cd3] text-white"
                    onClick={() => setSelectedInquiry(inquiry)} // Open modal with inquiry details
                  >
                    Display
                  </button> */}

                  <button
                    className="action-button rounded-lg p-2 text-l bg-[#4a9cd3] text-white"
                    onClick={() => updateInquiry(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button rounded-lg p-2 text-l bg-[#4a9cd3] text-white"
                    onClick={() => deleteInquiry(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && (
          <p
            className="confirmDelete"
            // style={{ color: "red", fontSize: "large" }}
          >
            {message}
          </p>
        )}

        {/* Modal for displaying inquiry details */}
        {selectedInquiry && (
          // inset-0: Stretches the <div> to cover the full screen
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Inquiry Details</h2>
              <p>
                <strong>Name:</strong> {selectedInquiry.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedInquiry.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedInquiry.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedInquiry.address}
              </p>
              <p>
                <strong>Service:</strong> {selectedInquiry.service}
              </p>
              <p>
                <strong>Message:</strong> {selectedInquiry.message}
              </p>
              <p>
                <strong>Status:</strong> {selectedInquiry.status}
              </p>
              <p>
                <strong>Notes:</strong> {selectedInquiry.adminNotes}
              </p>

              <button
                className="mt-4 bg-[#4a9cd3] text-white px-4 py-2 rounded"
                onClick={() => setSelectedInquiry(null)} // Close modal
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* {showForm && (
          <div className="flex justify-center items-center">
            <div className="mt-4 p-4 border">
              <h2>Display Inquiry</h2>

              {/* Inquiry Details */}
        {/* <div>
                <label className="block p-2">
                  {" "}
                  Name: {inquiries[index].name}{" "}
                </label>
                <label className="block p-2">
                  {" "}
                  Email: {inquiries[index].email}{" "}
                </label>
                <label className="block p-2">
                  {" "}
                  Phone: {inquiries[index].phone}{" "}
                </label>
                <label className="block p-2">
                  Address: {inquiries[index].address}
                </label>
                <label className="block p-2">
                  Service: {inquiries[index].service}
                </label>
                <label className="block p-2">
                  Message: {inquiries[index].message}
                </label>
                <label className="block p-2">
                  Status: {inquiries[index].status}
                </label>
                <label className="block p-2">
                  Notes: {inquiries[index].adminNotes}
                </label>
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2"
                onClick={() => setShowForm(false)}
              >
                Ok
              </button> 
            </div>
          </div>
        )}*/}
      </div>
    </div>
  );
}
