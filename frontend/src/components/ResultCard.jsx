import React from "react";

const ResultCard = ({ data }) => {
  return (
    <div className="mt-10 max-w-2xl mx-auto bg-white p-4 rounded-xl shadow">

      {data.thumbnail && (
        <img
          src={data.thumbnail}
          className="rounded-lg mb-4"
          alt="thumbnail"
        />
      )}

      <h2 className="font-semibold mb-4">
        {data.title}
      </h2>

      {data.formats?.map((f, i) => (
        <a
          key={i}
          href={f.url}
          target="_blank"
          className="block bg-green-500 text-white py-3 rounded-lg mb-2"
        >
          Download {f.quality}
        </a>
      ))}
    </div>
  );
};

export default ResultCard;