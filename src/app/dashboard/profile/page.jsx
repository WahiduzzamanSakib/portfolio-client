
"use client";

import React from "react";

import {
  FiUser,
  FiMail,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiEdit2,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { EditModal } from "@/app/components/EditModal";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const data = session?.user;

  if (isPending) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-center">
          Loading profile...
        </p>
      </div>
    );
  }

  const profile = {
    name: data?.name || "N/A",
    email: data?.email || "N/A",
    designation: data?.designation || "N/A",
    location: data?.location || "N/A",
    description: data?.description || "N/A",
    portfolio: data?.portfolio || "N/A",
    github: data?.github || "N/A",
    linkedin: data?.linkedin || "N/A",
    image: data?.image || "",
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            My Profile
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage your personal information.
          </p>
        </div>


        {/* <Button
          color="primary"
        >
          <FiEdit2 />
          Edit Profile
        </Button> */}
        <EditModal/>
      </div>

      {/* Profile Information */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Profile Image */}
        <div className="flex flex-col items-center md:w-64 shrink-0">

          <div className="w-36 h-36 rounded-full overflow-hidden bg-blue-100 border-4 border-blue-50 flex items-center justify-center">

            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FiUser className="text-blue-500 text-6xl" />
            )}

          </div>

          <h3 className="font-bold text-xl mt-4 text-gray-900">
            {profile.name}
          </h3>

          <p className="text-sm text-blue-600 mt-1">
            {profile.designation}
          </p>

        </div>

        {/* Details */}
        <div className="flex-1 space-y-6">

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <p className="mt-2 text-gray-600">
                {profile.name}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <p className="mt-2 text-gray-600 flex items-center gap-2">
                <FiMail className="text-blue-500" />
                {profile.email}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Designation
              </label>

              <p className="mt-2 text-gray-600">
                {profile.designation}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>

              <p className="mt-2 text-gray-600 flex items-center gap-2">
                <FiMapPin className="text-blue-500" />
                {profile.location}
              </p>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              About Me
            </label>

            <p className="mt-2 text-gray-600 leading-7">
              {profile.description}
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Social & Portfolio Links
            </h3>

            <div className="flex flex-wrap items-center gap-4">

              {[
                {
                  name: "portfolio",
                  label: "Portfolio",
                  icon: FiGlobe,
                },
                {
                  name: "github",
                  label: "GitHub",
                  icon: FiGithub,
                },
                {
                  name: "linkedin",
                  label: "LinkedIn",
                  icon: FiLinkedin,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.name} className="min-w-0">

                    <a
                      href={
                        profile[item.name] !== "N/A"
                          ? profile[item.name]
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <Icon className="text-lg" />

                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </a>

                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
