import React from "react";
import { useNavigate } from "react-router-dom";
//import Inquiry from "./pages/Inquiry";

export default function InquiryButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="bg-white text-[#4a9cd3] rounded-lg px-5 py-3 text-xl font-bold hover:bg-gray-200 transition"
        onClick={() => navigate("/inquiry")}
      >
        Get A Free Estimate
      </button>
    </div>
  );
}
