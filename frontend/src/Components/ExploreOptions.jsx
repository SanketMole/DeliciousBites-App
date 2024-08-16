import React, { useState } from "react";

const ExploreOptions = () => {
  const options = [
    {
      title: "Popular cuisines near me",
      content: "List of popular cuisines near you...",
    },
    {
      title: "Popular restaurant types near me",
      content: "List of popular restaurant types near you...",
    },
    {
      title: "Top Restaurant Chains",
      content: "List of top restaurant chains...",
    },
    {
      title: "Cities We Deliver To",
      content: "List of cities we deliver to...",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleOption = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4  md:p-8 my-6 md:my-10 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-lg">
      <h2 className=" text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-blue-800">
        Explore Options Near Me
      </h2>
      {options.map((option, index) => (
        <div key={index} className="mb-4 md:mb-6">
          <button
            onClick={() => toggleOption(index)}
            className="w-full flex justify-between items-center p-3 md:p-4 border rounded-lg shadow-md bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <span className="text-blue-700 font-medium text-sm md:text-base">
              {option.title}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 md:h-6 md:w-6 text-blue-500 transition-transform ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="p-3 md:p-4 bg-white mt-2 rounded-lg shadow-inner border-l-4 border-blue-500 transition-all duration-300">
              <p className="text-gray-700 text-sm md:text-base">
                {option.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExploreOptions;
