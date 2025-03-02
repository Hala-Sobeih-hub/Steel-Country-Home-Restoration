import React from "react";
//to include toasts and alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styling/ToastStyling.css";

export default function ToastWarningDisplay({ onCall, index, message }) {
  const confirmDelete = (index) => {
    toast.warn(
      <div className="toastWarn">
        {/* <p>Are you sure you want to delete this service?</p> */}
        <p>{message}</p>
        <div className="toast-buttons">
          <button
            className="toastConfirm"
            onClick={() => {
              onCall(index); // Call the deleteService function from props
              toast.dismiss();
            }}
          >
            Confirm
          </button>
          <button className="toastCancel" onClick={() => toast.dismiss()}>
            Cancel
          </button>
        </div>
      </div>,
      //******* TOAST Configuration and Styling  *******/
      // The properties like position, autoClose, closeOnClick, draggable, and hideProgressBar are configuration options for react-toastify and cannot be defined in a CSS file. These properties control the behavior of the toast, not its appearance.
      //However, you can style the toast appearance (background, text color, border, etc.) in your CSS file using react-toastify's built-in class names or by providing a custom class.
      // Behavior settings (like position, autoClose, etc.) must be set in the toast() function in JavaScript.
      // Styling (colors, fonts, borders) can be set in CSS using built-in react-toastify classes or a custom class.
      //If you want to define your own class, pass className inside the toast configuration:
      {
        //className: "custom-toast",
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  };

  return (
    <div>
      <button
        className=" action-button rounded-lg p-3 text-xl bg-[#4a9cd3] text-white"
        onClick={() => confirmDelete(index)} // Call confirmDelete with index
        t
      >
        Delete
      </button>
      {/* Toast Container Must Be Here */}
      <ToastContainer />
    </div>
  );
}
