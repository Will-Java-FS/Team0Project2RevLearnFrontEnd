import React from "react";

import { CardProps } from "../utils/types";
const Card: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <div className="flex justify-center items-center min-h-40 ">
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md overflow-hidden">
        <div className="relative -mt-6 h-50 overflow-hidden rounded-t-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-blue-gray-500/40">
          <img
            src="https://placehold.co/600x500/orange/white"
            alt="Card Image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h5 className="mb-2 text-lg font-semibold text-orange-500 line-clamp-2">
            {title}
          </h5>
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        </div>
        <div className="p-4 pt-0">
          <a
            href={link}
            className="block w-full text-center rounded-lg bg-orange-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
