
"use client";

import { useState } from "react";
import { FiCopy, FiCheck, FiCode } from "react-icons/fi";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const apiItems = [
  {
    name: "Get Active Projects",
    method: "GET",
    endpoint: "https://portfolio-server-eight-chi.vercel.app/projects",
    // endpoint: "/projects",
    description:
      "Get all active projects for displaying on the public portfolio website.",
  },
  // {
  //   name: "Get Owner's All Projects",
  //   method: "GET",
  //   endpoint: "/my-projects?ownerEmail={ownerEmail}",
  //   description:
  //     "Get all projects of a specific owner, including Active and Inactive projects.",
  // },
  {
    name: "Get Single Project Details",
    method: "GET",
    endpoint: "https://portfolio-server-eight-chi.vercel.app/projects/{projectId}",
    // endpoint: "/projects/{projectId}",
    description:
      "Get complete details of a single project using its custom project ID.",
  },
  // {
  //   name: "Add New Project",
  //   method: "POST",
  //   endpoint: "/projects",
  //   description:
  //     "Create and save a new project in the MongoDB database.",
  // },
  // {
  //   name: "Update Project Status",
  //   method: "PATCH",
  //   endpoint: "/projects/{mongoObjectId}/status",
  //   description:
  //     "Change a project's status between Active and Inactive using its MongoDB ObjectId.",
  // },
  // {
  //   name: "Update Project Order",
  //   method: "PATCH",
  //   endpoint: "/projects/order",
  //   description:
  //     "Update the display order of projects.",
  // },
  // {
  //   name: "Delete Project",
  //   method: "DELETE",
  //   endpoint: "/projects/{mongoObjectId}",
  //   description:
  //     "Permanently delete a project using its MongoDB ObjectId.",
  // },
];

const methodColors = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  PATCH: "bg-orange-100 text-orange-700",
  PUT: "bg-purple-100 text-purple-700",
  DELETE: "bg-red-100 text-red-700",
};

export default function AllApis() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const totalApis = apiItems.length;
  const totalMethods = new Set(
    apiItems.map((api) => api.method)
  ).size;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <FiCode size={28} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            API Documentation
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore all available APIs for managing and
            retrieving portfolio projects.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total API Endpoints
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {totalApis}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              HTTP Methods
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {totalMethods}
            </h2>
          </div>
        </div>

        {/* API List */}
        <div className="space-y-5">
          {apiItems.map((api, index) => {
            const fullUrl = `${api.endpoint}`;
            // const fullUrl = `${BASE_URL}${api.endpoint}`;

            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
              >
                {/* API Title */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-bold ${
                      methodColors[api.method]
                    }`}
                  >
                    {api.method}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {api.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {api.description}
                </p>

                {/* Endpoint */}
                <div className="mt-5">
                  {/* <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    API Endpoint
                  </p> */}

                  <div className="flex flex-col gap-3 rounded-lg bg-gray-100 p-3 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                    <code className="break-all text-sm text-gray-800 dark:text-gray-200">
                      {fullUrl}
                    </code>

                    <button
                      onClick={() =>
                        handleCopy(fullUrl, index)
                      }
                      className="flex shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      {copiedIndex === index ? (
                        <>
                          <FiCheck size={16} />
                          Copied
                        </>
                      ) : (
                        <>
                          <FiCopy size={16} />
                          Copy URL
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300">
            Important Notes
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-blue-800 dark:text-blue-200">
            <li>
              Replace dynamic parameters such as{" "}
              <code>{"{ownerEmail}"}</code>,{" "}
              <code>{"{projectId}"}</code> and{" "}
              <code>{"{mongoObjectId}"}</code> with actual values.
            </li>

            <li>
              <code>{"{projectId}"}</code> refers to the
              custom project ID, while{" "}
              <code>{"{mongoObjectId}"}</code> refers to
              MongoDB's <code>_id</code>.
            </li>

            <li>
              POST and PATCH endpoints require JSON request
              bodies.
            </li>

            <li>
              The API base URL is configured through the
              <code> NEXT_PUBLIC_SERVER_URL </code>
              environment variable.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
