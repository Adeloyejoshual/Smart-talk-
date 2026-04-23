import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleDownload = async (url) => {
    if (!url) return alert("Paste a valid link");

    setLoading(true);
    setData(null);

    try {
      const res = await fetch(
        "https://smart-talk-lwkx.onrender.com/api/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ url })
        }
      );

      const result = await res.json();

      if (result.success) {
        setData(result.data);
      } else {
        alert(result.error || "Failed to download");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <main className="flex-1 px-4">

        <Hero />

        {/* INPUT */}
        <InputBox onDownload={handleDownload} />

        {/* LOADING STATE */}
        {loading && (
          <p className="text-center mt-6 text-gray-500">
            Processing...
          </p>
        )}

        {/* RESULT */}
        {data && <ResultCard data={data} />}

      </main>

      <Footer />
    </div>
  );
};

export default HomePage;