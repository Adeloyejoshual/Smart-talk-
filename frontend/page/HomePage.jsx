import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default HomePage;