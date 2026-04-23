import React, { useState } from "react";

const InputBox = ({ onDownload }) => {
  const [url, setUrl] = useState("");

  return (
    <div className="flex gap-3 max-w-2xl mx-auto mt-6">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste video link..."
        className="flex-1 p-4 border rounded-xl"
      />

      <button
        onClick={() => onDownload(url)}
        className="bg-green-500 text-white px-6 rounded-xl"
      >
        Download
      </button>
    </div>
  );
};

export default InputBox;