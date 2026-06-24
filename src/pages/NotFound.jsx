import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-7xl font-bold text-red-500">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Room Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        This room may have been deleted or never existed.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
      >
        Go Home
      </button>

    </div>
  );
}

export default NotFound;