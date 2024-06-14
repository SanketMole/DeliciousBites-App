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
    <div className=" p-8 my-10">
      <h2 className="text-2xl font-semibold mb-6">Explore options near me</h2>
      {options.map((option, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleOption(index)}
            className="w-full flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{option.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-gray-500 transition-transform ${
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
            <div className="p-4 bg-gray-50 mt-2 rounded-lg">
              {option.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExploreOptions;
