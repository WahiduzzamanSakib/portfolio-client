import { Button } from '@heroui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const AddProjectPage = () => {
   return (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-2xl font-bold">
              Add New Project
            </h2>

            <p className="text-gray-500 text-sm mt-2 mb-6">
              Add a new project to your portfolio.
            </p>

            <form className="space-y-5">

              <div>
                <label className="text-sm font-medium">
                  Project Title
                </label>

                <input
                  type="text"
                  placeholder="Enter project title"
                  className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Project Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Write project description..."
                  className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Technologies
                </label>

                <input
                  type="text"
                  placeholder="React, Next.js, Tailwind CSS"
                  className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="text-sm font-medium">
                    Live Website URL
                  </label>

                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm font-medium">
                  Project Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full mt-2 border rounded-xl p-3"
                />
              </div>

              <Button color="primary" type="submit">
                <FiPlus />
                Add Project
              </Button>

            </form>

          </div>
        );
};

export default AddProjectPage;