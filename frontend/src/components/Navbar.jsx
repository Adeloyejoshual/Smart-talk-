import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 shadow-sm bg-white">
      <h1 className="text-xl font-bold text-blue-600">
        AllDownloader
      </h1>

      <div className="hidden md:flex gap-6 text-gray-600">
        <a href="#">Home</a>
        <a href="#">API</a>
        <a href="#">About</a>
      </div>

      <button className="md:hidden">☰</button>
    </nav>
  );
};

export default Navbar;