import React from "react";
import NavBar from "../Components/NavBar"; //Hala
import Footer from "../Components/Footer";
import Slideshow from "../Components/Slideshow";
import ServicesList from "../components-services/ServicesList";

import About from "./About";

import InquiryButton from "../Components/InquiryButton";


export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <NavBar />
      <div className="">
        <img
          className="lg:w-full"
          src="../assets/cover-photo.png"
          alt="cover-photo"
        />
        {/* Contact Button */}
        <div className="absolute top-50 right-20">
          {/* <button className="bg-white text-[#4a9cd3] rounded-lg px-5 py-3 text-xl font-bold hover:bg-gray-200 transition">
            Get A Free Estimate
          </button> */}
          <InquiryButton />
        </div>
        
      </div>
      <About />
      <h1 className="text-5xl font-bold text-center my-8">Services</h1>
      <p className="mx-10">
        Offering roofing, drywall, painting, pressure washing, gutters, soffit,
        fascia, interior renovations, and roofing repairs. Complimentary
        inspections, insurance claim help, and flexible financing available.
        Quality work to restore and enhance your home!
      </p>

      <ServicesList />

      <h1 className="text-5xl font-bold text-center my-8">Tips</h1>
      <Slideshow />

      <p>
        <br />
      </p>
      <Footer />
    </div>
  );
}
