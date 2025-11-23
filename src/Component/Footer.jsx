import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router';
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">

          {/* Logo + Text */}
          <div className="text-center md:text-left max-w-md space-y-3">
            <Logo />

            <p className="text-sm leading-relaxed text-gray-300">
              ZapShift is a fast, reliable, and trusted parcel delivery solution 
              across Bangladesh — offering express delivery, COD, fulfillment services, 
              and nationwide coverage with real-time tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-2 text-white">Follow Us</h3>

            <div className="flex gap-6 justify-center md:justify-end text-xl">
              <Link className="hover:text-[#C9F263] transition">
                <FaXTwitter />
              </Link>
              <Link className="hover:text-[#C9F263] transition">
                <FaLinkedin />
              </Link>
              <Link className="hover:text-[#C9F263] transition">
                <FaFacebook />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom text */}
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ZapShift Delivery — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
