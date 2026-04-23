import React, { useState } from "react";

const InputBox = ({ onDownload }) => {
  const [url, setUrl] = useState("");

  return (
    <div className="flex gap-3 max-w-2xl mx-auto">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste link here..."
        className="flex-1 p-4 rounded-xl border shadow"
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