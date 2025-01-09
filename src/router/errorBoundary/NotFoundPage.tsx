import React from "react";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-6 justify-center min-h-screen text-center text-white bg-slate-900">
      <BiError className="text-6xl text-yellow-500" />
      <h3 className="text-2xl lg:text-4xl font-bold">
        Oops! Something went wrong.
      </h3>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-indigo-500/100 text-white rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
