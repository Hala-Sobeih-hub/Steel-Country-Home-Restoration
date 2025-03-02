import React, { useEffect, useState } from "react"; // Import the useEffect and useState hooks
import { useNavigate } from "react-router-dom";
//import "./InquiriesAdmin.css";
import "../styling/AdminTables.css";
import "../styling/ToastStyling.css";

//Toast Warning and Success imports
import ToastWarningDisplay from "../components-toasts/ToastWarningDisplay";
import ToastSuccessDisplay from "../components-toasts/ToastSuccessDisplay";

const API = "http://localhost:3000/api/inquiries";

export default function InquiriesAdmin() {
  //create an inquiries state variable
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState(""); // Create the message state variable
  const [selectedInquiry, setSelectedInquiry] = useState(null); // Store the selected inquiry to be displayed

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
      .then((response) => response.json()) // Parse the response as JSON
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

      <div className="dashboard-container">
        <table className="dashboard-table" /*border-1 place-self-center*/>
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
                // onClick={() => setSelectedInquiry(inquiry)} // Open modal with inquiry details
              >
                <td
                  className="inquiryId"
                  align="center"
                  onClick={() => setSelectedInquiry(inquiry)} // Open modal with inquiry details
                >
                  {index + 1}
                </td>
                <td
                  className="inquiry-name text-center border border-gray-400"
                  onClick={() => setSelectedInquiry(inquiry)} // Open modal with inquiry details
                >
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
                  {inquiry.services.join(", ")}
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
                  <div className="button-group">
                    {/* Edit button> */}
                    <button
                      className="action-button rounded-lg p-3 text-xl bg-[#4a9cd3] text-white"
                      onClick={() => updateInquiry(index)}
                    >
                      Edit
                    </button>

                    {/* Delete button*/}
                    {/* pass the deleteInquiry function, index and message as props*/}
                    <ToastWarningDisplay
                      onCall={deleteInquiry}
                      index={index}
                      message={"Are you sure you want to delete this inquiry?"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {message && (
          <p
            className="confirmDelete"
            // style={{ color: "red", fontSize: "large" }}
          >
            {message}
          </p>
        )} */}

        {/* Toast Success Display should only be shown if there's a message */}
        {message && (
          <>
            {console.log(`from the main: ${message}`)}{" "}
            {/* You should see this log */}
            <ToastSuccessDisplay message={message} />
          </>
        )}

        {/* Modal for displaying inquiry details */}
        {selectedInquiry && (
          // inset-0: Stretches the <div> to cover the full screen
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Inquiry Details</h2>

              <div className="flex flex-col gap-2">
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Name:
                  </strong>
                  <p className="w-3/4 px-4">{selectedInquiry.name}</p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Email:
                  </strong>
                  <p className="w-3/4 px-4 ">{selectedInquiry.email}</p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Phone:
                  </strong>
                  <p className="w-3/4 px-4 ">{selectedInquiry.phone}</p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Address:
                  </strong>
                  <p className="w-3/4 px-4 ">{selectedInquiry.address}</p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Services:
                  </strong>
                  <p className="w-3/4 px-4 ">
                    {selectedInquiry.services.join(", ")}
                  </p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Message:
                  </strong>
                  <p className="w-3/4 px-4 ">{selectedInquiry.message}</p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Status:
                  </strong>
                  <p className="w-3/4 px-4 ">{selectedInquiry.status}</p>
                </div>
                <div className="flex">
                  <strong className="w-1/4 text-gray-700 text-right">
                    Notes:
                  </strong>
                  <p className="w-3/4 px-4 ">{selectedInquiry.adminNotes}</p>
                </div>
              </div>

              <div className="flex flex-row-reverse mt-4">
                <button
                  className="w-1/3 bg-[#4a9cd3] text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
