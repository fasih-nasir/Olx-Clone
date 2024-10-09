import React from 'react';
import logo from "../assets/logo.png"
export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container-fluid mx-auto d-flex justify-content-between px-5 py-8">
        <a className="flex title-font font-medium items-center text-gray-900">
          <img 
            src={logo}
            alt="OLX Logo"
            className="w-10 h-10 col-1 img-fluid navbar-brand"
          />
        </a>
        <p className="d-flex flex-row justify-content-end align-items-end">© 2024</p>
      </div>
    </footer>
  );
}
