import React from "react";

const TopSearch = () => {
  return (
    <div>
      <div className="bg-gray-100 relative">
        {/* Dynamic background image */}
        <img
          src="https://assets.architecturaldigest.in/photos/6385cf3311f0276636badfb6/16:9/w_2560%2Cc_limit/DSC_8367-Edit-W.png"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full z-0 opacity-100"
        />

        <div className="flex justify-center z-10">
          <div className="my-20 h-30 text-center w-full max-w-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default TopSearch;
