import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300 p-8 text-center">
      <h2 className="text-white font-bold">AllDownloader</h2>

      <p className="text-sm mt-2">
        Fast, free video downloader for social media platforms.
      </p>

      <p className="text-xs mt-6 text-gray-500">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;