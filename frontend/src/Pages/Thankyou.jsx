import React from "react";

const Thankyou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Your order has been placed successfully. We appreciate your business!
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive a confirmation email shortly with the details of your
          order.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Thankyou;
