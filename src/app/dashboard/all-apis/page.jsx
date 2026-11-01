
"use client";

import React, { useState } from "react";
import {
  FiCode,
  FiCopy,
  FiCheck,
  FiInfo,
  FiDatabase,
  FiGlobe,
} from "react-icons/fi";

const BASE_URL = "https://your-domain.com";

const apiItems = [
  {
    name: "Get Visitor Analytics",
    method: "GET",
    endpoint: "/api/analytics",
    description:
      "Get total website views and unique visitor statistics.",
    body: null,
    response: {
      totalVisitors: 120,
      totalViews: 350,
    },
  },
  {
    name: "Track Website Visitor",
    method: "POST",
    endpoint: "/api/analytics",
    description:
      "Save visitor information and the page path they visited.",
    body: {
      visitorId: "unique-visitor-id",
      pagePath: "/projects",
    },
    response: {
      success: true,
    },
  },
];

const methodColors = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  PUT: "bg-yellow-100 text-yellow-700",
  PATCH: "bg-purple-100 text-purple-700",
  DELETE: "bg-red-100 text-red-700",
};

export default function AllApis() {
  const [copied, setCopied] = useState("");

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          All APIs
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Explore API documentation and copy endpoints to use in your projects.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiCode className="text-xl" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total API Endpoints
              </p>

              <h3 className="text-2xl font-bold text-gray-900">
                {apiItems.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <FiDatabase className="text-xl" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Available Methods
              </p>

              <h3 className="text-2xl font-bold text-gray-900">
                {new Set(apiItems.map((api) => api.method)).size}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* API Documentation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">

        <div className="flex items-center gap-3 mb-6">
          <FiGlobe className="text-xl text-blue-600" />

          <h3 className="text-lg font-bold text-gray-900">
            API Documentation
          </h3>
        </div>

        <div className="space-y-6">

          {apiItems.map((api, index) => {
            const copyId = `endpoint-${index}`;
            const fullUrl = `${BASE_URL}${api.endpoint}`;

            return (
              <div
                key={copyId}
                className="border border-gray-200 rounded-xl p-4 md:p-5 space-y-4"
              >

                {/* API Title */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <h4 className="font-bold text-gray-900">
                    {index + 1}. {api.name}
                  </h4>

                  {/* <span
                    className={`w-fit px-3 py-1 rounded-md text-xs font-bold ${
                      methodColors[api.method]
                    }`}
                  >
                    {api.method}
                  </span> */}

                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">
                  {api.description}
                </p>

                {/* Endpoint */}
                <div className="bg-gray-50 rounded-lg p-3">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div className="min-w-0">
                      {/* <p className="text-xs text-gray-500 mb-1">
                        API Endpoint
                      </p> */}

                      <code className="text-sm text-gray-800 break-all">
                        {fullUrl}
                      </code>
                    </div>

                    <button
                      onClick={() => handleCopy(fullUrl, copyId)}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition shrink-0"
                    >
                      {copied === copyId ? (
                        <>
                          <FiCheck />
                          Copied
                        </>
                      ) : (
                        <>
                          <FiCopy />
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

      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <FiInfo className="text-blue-600 text-lg mt-0.5 shrink-0" />

        <p className="text-sm text-blue-800 leading-6">
          Replace the example domain with the actual deployed website URL
          before using these endpoints. Request and response examples
          are provided to help developers understand how the APIs work.
        </p>
      </div>

    </div>
  );
}
