
"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const AddProjectPage = () => {
  // Dynamic fields
  const [features, setFeatures] = useState([""]);
  const [challenges, setChallenges] = useState([""]);
  const [futurePlans, setFuturePlans] = useState([""]);

  // Input styles
  const inputClass =
    "w-full mt-2 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "text-sm font-semibold text-gray-700";

  // Add new field
  const addField = (state, setState) => {
    setState([...state, ""]);
  };

  // Remove field
  const removeField = (index, state, setState) => {
    setState(state.filter((_, i) => i !== index));
  };

  // Update field value
  const handleArrayChange = (index, value, state, setState) => {
    const updated = [...state];
    updated[index] = value;
    setState(updated);
  };

  // Form submit
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      id: formData.get("id"),
      title: formData.get("title"),
      desc: formData.get("desc"),
      image: formData.get("image"),

      tags: formData
        .get("tags")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      features: features.filter((item) => item.trim() !== ""),
      challenges: challenges.filter((item) => item.trim() !== ""),
      futurePlans: futurePlans.filter((item) => item.trim() !== ""),

      clientRepo: formData.get("clientRepo"),
      serverRepo: formData.get("serverRepo") || null,
      live: formData.get("live"),
      isActive: formData.get("isActive") === "true",
    };

    console.log("Submitting Project Data:", data);

    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER_URL}/projects`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   const result = await res.json();
    //   if (!res.ok) {
    //     throw new Error(result.message || "Failed to add project");
    //   }

    //   console.log(result);
    //   toast.success("Project added successfully!");
    //   router.push("/dashboard/projects");

    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to add project");
    // }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">

      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Project
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Add a new project to your portfolio.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-7">

        {/* Basic Information */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className={labelClass}>Project ID</label>
              <input
                name="id"
                placeholder="e.g. tools-buying"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Project Title</label>
              <input
                name="title"
                placeholder="Enter project title"
                className={inputClass}
                required
              />
            </div>

          </div>

          <div className="mt-5">
            <label className={labelClass}>
              Project Description
            </label>

            <textarea
              name="desc"
              rows={4}
              placeholder="Write project description..."
              className={inputClass}
              required
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Technologies and Image */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Technologies & Image
          </h3>

          <div>
            <label className={labelClass}>
              Technologies (comma separated)
            </label>

            <input
              name="tags"
              placeholder="React, JavaScript, Tailwind CSS, DaisyUI"
              className={inputClass}
              required
            />
          </div>

          <div className="mt-5">
            <label className={labelClass}>
              Project Image URL
            </label>

            <input
              name="image"
              type="url"
              placeholder="https://example.com/image.png"
              className={inputClass}
              required
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Features */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Project Features
          </h3>

          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">

              <input
                value={feature}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    e.target.value,
                    features,
                    setFeatures
                  )
                }
                placeholder={`Feature ${index + 1}`}
                className={inputClass}
              />

              {features.length > 1 && (
                <Button
                  color="danger"
                  variant="flat"
                  isIconOnly
                  type="button"
                  onPress={() =>
                    removeField(index, features, setFeatures)
                  }
                >
                  <FiTrash2 />
                </Button>
              )}

            </div>
          ))}

          <Button
            color="primary"
            variant="flat"
            type="button"
            onPress={() => addField(features, setFeatures)}
          >
            <FiPlus />
            Add Feature
          </Button>
        </div>

        <hr className="border-gray-100" />

        {/* Challenges */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Challenges
          </h3>

          {challenges.map((challenge, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">

              <input
                value={challenge}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    e.target.value,
                    challenges,
                    setChallenges
                  )
                }
                placeholder={`Challenge ${index + 1}`}
                className={inputClass}
              />

              {challenges.length > 1 && (
                <Button
                  color="danger"
                  variant="flat"
                  isIconOnly
                  type="button"
                  onPress={() =>
                    removeField(index, challenges, setChallenges)
                  }
                >
                  <FiTrash2 />
                </Button>
              )}

            </div>
          ))}

          <Button
            color="primary"
            variant="flat"
            type="button"
            onPress={() => addField(challenges, setChallenges)}
          >
            <FiPlus />
            Add Challenge
          </Button>
        </div>

        <hr className="border-gray-100" />

        {/* Future Plans */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Future Plans
          </h3>

          {futurePlans.map((plan, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">

              <input
                value={plan}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    e.target.value,
                    futurePlans,
                    setFuturePlans
                  )
                }
                placeholder={`Future Plan ${index + 1}`}
                className={inputClass}
              />

              {futurePlans.length > 1 && (
                <Button
                  color="danger"
                  variant="flat"
                  isIconOnly
                  type="button"
                  onPress={() =>
                    removeField(index, futurePlans, setFuturePlans)
                  }
                >
                  <FiTrash2 />
                </Button>
              )}

            </div>
          ))}

          <Button
            color="primary"
            variant="flat"
            type="button"
            onPress={() => addField(futurePlans, setFuturePlans)}
          >
            <FiPlus />
            Add Future Plan
          </Button>
        </div>

        <hr className="border-gray-100" />

        {/* Project Status */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Project Visibility
          </h3>

          <label className={labelClass}>
            Project Status
          </label>

          <select
            name="isActive"
            defaultValue="true"
            className={inputClass}
          >
            <option value="true">Active - Show on Portfolio</option>
            <option value="false">Inactive - Hide from Portfolio</option>
          </select>
        </div>

        <hr className="border-gray-100" />

        {/* Project Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Project Links
          </h3>

          <div className="space-y-5">

            <div>
              <label className={labelClass}>
                Live Website URL
              </label>

              <input
                name="live"
                type="url"
                placeholder="https://example.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Client Repository URL
              </label>

              <input
                name="clientRepo"
                type="url"
                placeholder="https://github.com/username/project"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                Server Repository URL (Optional)
              </label>

              <input
                name="serverRepo"
                type="url"
                placeholder="https://github.com/username/server"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">

          <Button
            color="primary"
            type="submit"
            className="px-7 font-semibold"
          >
            <FiPlus />
            Add Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectPage;
