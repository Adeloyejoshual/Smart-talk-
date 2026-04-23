import React from "react";

const ResultCard = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-4 rounded-xl shadow">

      {data.thumbnail && (
        <img src={data.thumbnail} className="rounded-lg mb-4" />
      )}

      <h2 className="font-bold mb-4">{data.title}</h2>

      {data.formats?.map((f, i) => (
        <a
          key={i}
          href={f.url}
          target="_blank"
          className="block bg-green-500 text-white p-3 rounded mb-2"
        >
          Download {f.quality}
        </a>
      ))}

    </div>
  );
};

export default ResultCard;