import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async (url) => {
    if (!url) return alert("Paste a valid link");

    setLoading(true);
    setData(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const result = await res.json();

      if (result.success) {
        setData(result.data);
      } else {
        alert(result.error || "Failed");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <main className="flex-1">

        <Hero />

        <InputBox onDownload={handleDownload} />

        {loading && <Loader />}

        {data && <ResultCard data={data} />}

      </main>

      <Footer />

    </div>
  );
};

export default HomePage;