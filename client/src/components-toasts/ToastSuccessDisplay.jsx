import React, { useEffect } from "react";
//to include toasts and alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styling/ToastStyling.css";

export default function ToastSuccessDisplay({ message }) {
  // Toast logic for success
  useEffect(() => {
    if (message) {
      //   console.log(`from the toast: ${message}`);
      toast.success(
        <div className="toastSuccess">
          <p>{message}</p>
          <div className="toast-buttons">
            <button
              className="toastOk"
              onClick={() => {
                toast.dismiss();
              }}
            >
              OK
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
        }
      );
    }
  }, [message]); // Dependency array ensures the toast is triggered whenever message changes

  return <ToastContainer />;
}
