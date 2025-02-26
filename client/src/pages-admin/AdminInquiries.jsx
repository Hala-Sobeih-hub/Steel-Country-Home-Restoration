import React from "react";
import NavBarAdmin from "../Components/NavBar-Admin"; //Hala
import Footer from "../Components/Footer";

import InquiriesAdmin from "../components-inquiry/InquiriesAdmin";

export default function AdminInquiries() {
  return (
    <div>
      <NavBarAdmin />

      <InquiriesAdmin />
      <p>
        <br />
      </p>
      <Footer />
    </div>
  );
}
