import React from "react";

const SkeletonLoader = () => {
  return (
    <div>
      <div className="relative flex flex-col mt-6 mx-5 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 ">
        <div className="relative h-56 mx-6 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gray-400 "></div>
        <div className="p-10">
          <div className="flex justify-end h-10">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          </div>
          <h5 className="block mb-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-900"></h5>

          <div className="h-4 bg-gray-400 rounded w-full my-2 -mx-2"></div>
          <div className="h-4 bg-gray-400 rounded w-full my-2 -mx-2"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6 my-2 -mx-2"></div>
        </div>
        <div className="p-3 pt-0 flex justify-between items-center rounded-b-xl">
          <div>
            <div className="flex items-center px-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full ">j</div>
              <div className="w-8 h-8 bg-gray-400 rounded-full mx-4"></div>
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="w-24 h-10 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
