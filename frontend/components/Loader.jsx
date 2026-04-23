import React from "react";

const Loader = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 mt-3">Processing...</p>
    </div>
  );
};

export default Loader;