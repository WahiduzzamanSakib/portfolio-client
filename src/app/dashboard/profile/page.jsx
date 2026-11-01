
"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";

import {
  FiUser,
  FiMail,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiEdit2,
  FiSave,
  FiX,
  FiMapPin,
} from "react-icons/fi";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "yourname@gmail.com",
    designation: "Frontend Developer",
    location: "Dhaka, Bangladesh",
    description:
      "I am a passionate Frontend Developer. I love building modern, responsive and user-friendly web applications.",
    portfolio: "https://yourportfolio.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfile((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // পরে এখানে API দিয়ে MongoDB-তে save করবে
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

        {!isEditing ? (
          <Button
            color="primary"
            onPress={() => setIsEditing(true)}
          >
            <FiEdit2 />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              color="primary"
              onPress={handleSave}
            >
              <FiSave />
              Save
            </Button>

            <Button
              variant="bordered"
              onPress={() => setIsEditing(false)}
            >
              <FiX />
              Cancel
            </Button>
          </div>
        )}

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

          {isEditing && (
            <label className="mt-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline">
              Change Profile Image

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

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

              {isEditing ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <p className="mt-2 text-gray-600">
                  {profile.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>

              {isEditing ? (
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <p className="mt-2 text-gray-600 flex items-center gap-2">
                  <FiMail className="text-blue-500" />
                  {profile.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Designation
              </label>

              {isEditing ? (
                <input
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <p className="mt-2 text-gray-600">
                  {profile.designation}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>

              {isEditing ? (
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <p className="mt-2 text-gray-600 flex items-center gap-2">
                  <FiMapPin className="text-blue-500" />
                  {profile.location}
                </p>
              )}
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              About Me
            </label>

            {isEditing ? (
              <textarea
                name="description"
                rows="4"
                value={profile.description}
                onChange={handleChange}
                className="profile-input resize-none"
              />
            ) : (
              <p className="mt-2 text-gray-600 leading-7">
                {profile.description}
              </p>
            )}
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
                    {isEditing ? (
                      <div className="w-full sm:w-56">
                        <label className="text-xs text-gray-500 mb-1 block">
                          {item.label}
                        </label>

                        <input
                          name={item.name}
                          value={profile[item.name]}
                          onChange={handleChange}
                          className="profile-input"
                        />
                      </div>
                    ) : (
                      <a
                        href={profile[item.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      >
                        <Icon className="text-lg" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </a>
                    )}
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
