import React, { useEffect, useState } from "react"; // Import the useEffect and useState hooks
import { useNavigate } from "react-router-dom";
//import "./ServicesAdmin.css";
import "../styling/AdminTables.css";
import "../styling/ToastStyling.css";

//Toast Warning and Success imports
import ToastWarningDisplay from "../components-toasts/ToastWarningDisplay";
import ToastSuccessDisplay from "../components-toasts/ToastSuccessDisplay";

const API = "http://localhost:3000/api/services";

export default function ServicesAdmin() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]); //Create the services state variable
  const [message, setMessage] = useState(""); // Create the message state variable

  //Run this effect once when the page mounts
  useEffect(() => {
    //get the services from the API
    fetch(API)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setServices(data.result)) //set the services state variable
      .catch((error) => console.log(error)); //log any errors
  }, [services]);

  const deleteService = (index) => {
    fetch(`${API}/${services[index]._id}`, {
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

  const addService = () => {
    navigate("/admin/services/add-service");
  };

  const updateService = (index) => {
    navigate("/admin/services/update-service", {
      //state: { _id: services[index]._id, serviceName: services[index].name },
      state: { service: services[index] }, //pass the service to be updated
    });
  };

  // This useEffect will clear the message after the success toast is shown
  useEffect(() => {
    if (message) {
      // After showing the toast, clear the message after a short delay
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000); // Clear after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }
  }, [message]);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-8">
        Services - Admin Dashboard
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
              <th className="service-name" /*border-gray-300"*/ width={100}>
                Name
              </th>
              <th className="service-description" width={400}>
                Description
              </th>
              <th className="service-image">Image</th>
              <th className="actions" width={200}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={service._id}
                className="serviceId border border-gray-400"
              >
                <td className="serviceId" align="center">
                  {index + 1}
                </td>
                <td className="service-name text-center border border-gray-400">
                  {service.name}
                </td>
                <td className="service-description border border-gray-400 p-4">
                  {service.description}
                </td>
                <td className="service-image border border-gray-400 p-4 w-150 lg-w-fit">
                  <img src={service.imageUrl} alt={service.name} />
                </td>
                <td
                  className="actions" /*flex justify-between items-center p-4*/
                >
                  <div className="button-group">
                    {/* Edit button> */}
                    <button
                      className="action-button rounded-lg p-3 text-xl bg-[#4a9cd3] text-white"
                      onClick={() => updateService(index)}
                    >
                      Edit
                    </button>
                    {/* Delete button> */}
                    {/* pass the deleteService function, index and message as props*/}
                    <ToastWarningDisplay
                      onCall={deleteService}
                      index={index}
                      message={"Are you sure you want to delete this service?"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Toast Success Display should only be shown if there's a message */}
        {message && (
          <>
            {console.log(`from the main: ${message}`)}{" "}
            {/* You should see this log */}
            <ToastSuccessDisplay message={message} />
          </>
        )}

        <div className="addContainer">
          <button
            className="add-button rounded-lg p-3 text-xl bg-[#4a9cd3]"
            onClick={() => addService()}
          >
            Add a New Service
          </button>
        </div>
      </div>
    </div>
  );
}
