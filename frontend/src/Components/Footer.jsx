import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 m-6 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between flex-wrap">
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h5 className="font-bold mb-2">ABOUT DELICIOUS BITE</h5>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Who We Are
                </a>
              </li>

              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Work With Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Investor Relations
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Report Fraud
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Press Kit
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h5 className="font-bold mb-2">Delicious-Bites</h5>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Delicious Bites
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Blinkit
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Feeding India
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Hyperpure
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Deliciousland
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Weather Union
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h5 className="font-bold mb-2">FOR RESTAURANTS</h5>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Partner With Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Apps For You
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4">
            <h5 className="font-bold mb-2">LEARN MORE</h5>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Privacy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Security
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Terms
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div className="text-gray-600">
            © 2024 Delicious Bites Ltd. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Security
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Sitemap
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Download on the App Store
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Get it on Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
