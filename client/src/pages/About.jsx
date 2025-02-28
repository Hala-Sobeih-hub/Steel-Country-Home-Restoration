import "./About.css";
export default function About() {
  return (
    <section id="about-jump" className="about-section">
      <h2>About Us</h2>
      <p>
        Offering roofing, drywall, painting, pressure washing, gutters, soffit,
        fascia, interior renovations, and roofing repairs. Complimentary
        inspections, insurance claim help, and flexible financing available.
        Quality work to restore and enhance your home!
        {/* We are a family-owned and
        operated business with over 20 years of experience. We are licensed,
        bonded, and insured. We take pride in our work and treat every home as
        if it were our own. We are here to help you with all your home
        improvement needs. We are committed to providing you with high-quality,
        professional services at an affordable price. */}
        <br />
        <br />
        <b>We offer free estimates and consultations!</b>
        {/* Contact Button */}
        <div className="">
          <button className="bg-white text-[#4a9cd3] rounded-lg px-5 py-3 text-xl font-bold hover:bg-gray-200 transition">
            Get A Free Estimate
          </button>
        </div>
      </p>
    </section>
  );
}
