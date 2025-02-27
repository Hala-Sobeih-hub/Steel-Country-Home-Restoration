import React from "react";
import { FaFacebook, FaPhone, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="bg-[#4a9cd3] py-5">
      {/* to horizontally align the contact info, map and Contact Us button */}
      <div className="flex flex-row items-center justify-center space-x-20">
        {/* Contact Information */}
        <div className="flex flex-col items-start text-white space-y-4">
          {/* Logo */}
          <div className="w-20 h-20">
            <img
              src="../assets/logo-2.jpg"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Address */}
          <div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-xl" />
              <p>106 Carmel Dr., Cibolo,</p>
            </div>
            <p className="ml-6">TX, United States, Texas</p>
          </div>
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <FaPhone />
            <span>(210) 627-3105</span>
          </div>
          {/* Email */}
          <div className="flex items-center space-x-2">
            <FaEnvelope />
            <span>manncarter33@cloud.com</span>
          </div>
          {/* Facebook Link */}
          <div>
            <a href="https://www.facebook.com/people/Steel-Country-Home-Restorations/61569069813941/">
              <FaFacebook className="text-3xl hover:text-blue-400" />
            </a>
          </div>
        </div>

        {/* Map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.7813168183466!2d-98.25211382533901!3d29.580965475160205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c93a7252650db%3A0xc95b6987917fd742!2s106%20Carmel%20Dr%2C%20Cibolo%2C%20TX%2078108!5e0!3m2!1sen!2sus!4v1740625264348!5m2!1sen!2sus"
            width="500"
            height="250"
            className="rounded-lg shadow-lg"
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Button */}
        <div>
          <button className="bg-white text-[#4a9cd3] rounded-lg px-5 py-3 text-xl font-bold hover:bg-gray-200 transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
