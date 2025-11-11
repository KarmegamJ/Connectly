import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow">
      <h1 className="text-2xl font-bold text-blue-600">Connectly</h1>
      <nav className="space-x-6">
        <a href="#features" className="text-gray-600 hover:text-blue-600">
          Features
        </a>
        <a href="#about" className="text-gray-600 hover:text-blue-600">
          About
        </a>
        <a
          href="#contact"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Get Started
        </a>
      </nav>
    </header>
  );
};

export default Header;
