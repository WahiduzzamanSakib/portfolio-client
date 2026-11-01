
import React from "react";

import {
  FiUser,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiCalendar,
  FiInfo,
  FiCode,
  FiExternalLink,
} from "react-icons/fi";

// Fixed Owner & Website Information
const ownerInfo = {
  name: "Md Waheduzzaman",
  role: "Owner & Developer",

  logo: "https://i.ibb.co.com/9m9YfHw3/My-Logo.png",

  portfolio: "https://waheduzzaman.vercel.app/",
  github: "https://github.com/WahiduzzamanSakib",
  linkedin: "https://www.linkedin.com/in/waheduzzaman-md/",

  buildYear: "2026",

  websiteName: "My Portfolio",
  websiteType: "Personal Portfolio",

  technology: [
    "Next.js",
    "React",
    "JavaScript",
    "Tailwind CSS",
    "HeroUI",
    "MongoDB",
  ],

// purpose:
  //   "This project is a personal portfolio website designed to showcase the owner's professional identity, skills, projects, and experience. It includes a dedicated admin dashboard that allows the owner to manage profile information, add and manage portfolio projects, update website content, and maintain essential owner details. The dashboard also provides visitor analytics, including total page views and unique visitors, to help monitor website activity. Visitors can explore the portfolio, view projects, learn about the owner, and access official social and professional links. The main goal of this platform is to build a professional online presence, showcase work, and make it easier for potential clients, recruiters, and collaborators to connect with the owner."


  purpose:
    "This website is a personal portfolio where visitors can easily explore the owner's profile, skills, experience, and projects. Visitors can browse different projects, learn more about the owner, and visit professional social profiles through the provided links. The website is simple and easy to navigate, so anyone can find the information they need. It also includes an admin dashboard where the owner can update profile details, add new projects, manage website information, and check visitor statistics. Everything is organized in one place to make the website easy to explore and manage.",
};

const AboutOwner = () => {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          About 
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Learn about the website, its owner, and how it works.
        </p>
      </div>

      {/* Owner Information */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">

        <div className="flex flex-col sm:flex-row items-center gap-6">

          {/* Brand Logo */}
          <div className="w-28 h-28 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={ownerInfo.logo}
              alt="Brand Logo"
              className="w-full h-full object-contain p-2"
            />
          </div>

          {/* Owner Details */}
          <div className="text-center sm:text-left">

            <div className="flex items-center justify-center sm:justify-start gap-2">
              <FiUser className="text-blue-600 text-xl" />

              <span className="text-sm text-gray-500">
                Website Owner & Developer
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-2">
              {ownerInfo.name}
            </h3>

            <p className="text-blue-600 font-medium mt-1">
              {ownerInfo.role}
            </p>

          </div>
        </div>

        {/* Official Links */}
        <div className="mt-8 pt-6 border-t border-gray-100">

          <h3 className="font-semibold text-gray-800 mb-4">
            Official Links
          </h3>

          <div className="flex flex-wrap items-center gap-3">

            <a
              href={ownerInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              <FiGlobe />
              Portfolio
              <FiExternalLink className="text-xs" />
            </a>

            <a
              href={ownerInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            >
              <FiGithub />
              GitHub
              <FiExternalLink className="text-xs" />
            </a>

            <a
              href={ownerInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              <FiLinkedin />
              LinkedIn
              <FiExternalLink className="text-xs" />
            </a>

          </div>
        </div>
      </div>

      {/* Website Purpose */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-3 mb-4">
          <FiGlobe className="text-2xl text-blue-600" />

          <h3 className="text-lg font-bold text-gray-900">
            Website Purpose
          </h3>
        </div>

        <p className="text-gray-600 leading-7 text-sm md:text-base">
          {ownerInfo.purpose}
        </p>

      </div>

      {/* Website Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-3 mb-6">

          <FiInfo className="text-2xl text-blue-600" />

          <h3 className="text-lg font-bold text-gray-900">
            Website Information
          </h3>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Website Name */}
          <div className="p-4 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500">
              Website Name
            </p>

            <h4 className="font-semibold text-gray-900 mt-1">
              {ownerInfo.websiteName}
            </h4>
          </div>

          {/* Website Type */}
          <div className="p-4 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500">
              Website Type
            </p>

            <h4 className="font-semibold text-gray-900 mt-1">
              {ownerInfo.websiteType}
            </h4>
          </div>

          {/* Build Year */}
          <div className="p-4 rounded-xl bg-gray-50">

            <div className="flex items-center gap-2 text-gray-500">
              <FiCalendar />

              <p className="text-sm">
                Build Year
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mt-1">
              {ownerInfo.buildYear}
            </h4>

          </div>

          {/* Technology Stack */}
          <div className="p-4 rounded-xl bg-gray-50">

            <div className="flex items-center gap-2 text-gray-500">
              <FiCode />

              <p className="text-sm">
                Technology Stack
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">

              {ownerInfo.technology.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-100 text-blue-700"
                >
                  {tech}
                </span>
              ))}

            </div>

          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">
          © {ownerInfo.buildYear} {ownerInfo.name}.
          All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default AboutOwner;
