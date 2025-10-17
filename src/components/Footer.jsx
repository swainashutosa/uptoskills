import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";

function SocialIcon({ label, path, children }) {
  return (
    <a
      href={path}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:text-orange-500 hover:border-orange-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white">UpToSkills</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Learn. Grow. Succeed. Quality courses for your bright future.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon label="LinkedIn" path="https://www.linkedin.com">
                <FaLinkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon label="GitHub" path="https://github.com">
                <FaGithub className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon label="Twitter" path="https://twitter.com">
                <FaTwitter className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon label="YouTube" path="https://www.youtube.com">
                <FaYoutube className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-400">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-orange-500" href="/">Home</a></li>
              <li><a className="hover:text-orange-500" href="/about">About Us</a></li>
              <li><a className="hover:text-orange-500" href="/learn">Courses</a></li>
              <li><a className="hover:text-orange-500" href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-400">Practice</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-orange-500" href="/DSA">Data Structure</a></li>
              <li><a className="hover:text-orange-500" href="/SQL">SQL</a></li>
            </ul>
          </div>

          {/* Contest */}
          <div>
            <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-400">Contest</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-orange-500" href="/contests">Daily Contest</a></li>
              <li><a className="hover:text-orange-500" href="/contests">Weekly Contest</a></li>
              <li><a className="hover:text-orange-500" href="/contests">Monthly Contest</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-400">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Email: <a href="mailto:info@mybrand.com" className="hover:text-orange-500">info@mybrand.com</a></li>
              <li>Phone: <a href="tel:+919876543210" className="hover:text-orange-500">+91 98765 43210</a></li>
              <li>Address: New Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gray-200 dark:bg-gray-800" />

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} UpToSkills. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


