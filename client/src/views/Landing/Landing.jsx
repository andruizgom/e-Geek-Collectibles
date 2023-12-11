import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Slide from "../../components/Slide/Slide";
import Welcome from "../../components/Welcome/Welcome";
import React from "react";

export default function Landing() {

  return (
    <div>
      <Banner />
      <Welcome />
      <Slide />
      <Footer />
    </div>
  );
}
