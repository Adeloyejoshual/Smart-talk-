import React, { useState } from "react";
import InputBox from "./InputBox";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDownload = async (url) => {
    setLoading(true);
    setResult(null);

    const res = await fetch("http://localhost:5000/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    setLoading(false);
    setResult(data);
  };

  return (
    <section className="text-center py-16 px-4 bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Download Videos Instantly
      </h1>

      <p className="text-gray-500 mb-8">
        Paste any social media link and download in seconds
      </p>

      <InputBox onDownload={handleDownload} />

      {loading && <Loader />}
      {result && <ResultCard data={result} />}
    </section>
  );
};

export default Hero;