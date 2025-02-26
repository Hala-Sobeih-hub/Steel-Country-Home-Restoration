import React, { useEffect, useState } from "react"; // Import the useEffect and useState hooks
import { useNavigate } from "react-router-dom";
import "./InquiriesAdmin.css";

const API = "http://localhost:3000/api/inquiries";

export default function InquiriesAdmin() {
  //create an inquiries state variable
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState(""); // Create the message state variable

  useEffect(() => {
    //get the inquiries from the API
    fetch(API)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setInquiries(data.result)) //set the inquiries state variable
      .catch((error) => consle.log(error)); //log any errors
  }, [inquiries]);

  const deleteInquiry = () => {};
  const updateInquiry = () => {};

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

                <td
                  className="actions" /*flex justify-between items-center p-4*/
                >
                  <button
                    className="action-button rounded-lg p-2 text-l bg-[#4a9cd3]"
                    onClick={() => displayInquiry(index)}
                  >
                    Display
                  </button>
                  <button
                    className="action-button rounded-lg p-2 text-l bg-[#4a9cd3]"
                    onClick={() => updateInquiry(index)}
                  >
                    Edit
                  </button>
                  <button
                    className=" action-button rounded-lg p-2 text-l bg-[#4a9cd3]"
                    onClick={() => deleteInquiry(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
