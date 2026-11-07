"use client";

import React, { useCallback, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiTrash2, FiArrowUp, FiArrowDown, FiFolder } from "react-icons/fi";
import { EditProjectsModal } from "@/app/components/EditProjectsModal";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const AllprojectPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get owner's all projects
  const fetchProjects = useCallback(async () => {
    if (!email) return;

    try {
      // const res = await fetch(
      //   `${API}/my-projects?ownerEmail=${encodeURIComponent(email)}`
      // );
      const res = await fetch(`${API}/my-projects`)

      if (!res.ok) throw new Error();

      const data = await res.json();

      setProjects(
        [...data].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
      );
    } catch {
      toast.error("Could not load projects");
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    // Wait until the session check finishes
    if (isPending) return;

    // Logged out: stop the loading state instead of spinning forever
    if (!email) {
      setLoading(false);
      return;
    }

    fetchProjects();
  }, [isPending, email, fetchProjects]);

  // Active / Inactive
  const toggleStatus = async (project) => {
    try {
      const res = await fetch(`${API}/projects/${project._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive: !project.isActive,
        }),
      });

      if (!res.ok) throw new Error();

      setProjects((prev) =>
        prev.map((item) =>
          item._id === project._id
            ? { ...item, isActive: !item.isActive }
            : item
        )
      );

      toast.success("Project status updated");
    } catch {
      toast.error("Status update failed");
    }
  };

  // Change order
  const moveProject = async (index, direction) => {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= projects.length) return;

    const previous = projects; // keep a copy so we can roll back

    const updated = [...projects];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

    const orderedProjects = updated.map((project, i) => ({
      ...project,
      order: i + 1,
    }));

    setProjects(orderedProjects);

    try {
      const res = await fetch(`${API}/projects/order`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: orderedProjects.map((project) => ({
            id: project._id,
            order: project.order,
          })),
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Project order updated");
    } catch {
      setProjects(previous); // roll back on failure
      toast.error("Order update failed");
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setProjects((prev) => prev.filter((project) => project._id !== id));

      toast.success("Project deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Projects</h2>
          <p className="text-sm text-gray-500 mt-2">
            Manage and organize your portfolio projects.
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/add-project")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer"
        >
          + Add Project
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-7">
        <div className="bg-gray-50 border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Projects</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">
            {projects.length}
          </h3>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-sm text-green-700">Active</p>
          <h3 className="text-2xl font-bold text-green-700 mt-1">
            {projects.filter((p) => p.isActive).length}
          </h3>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-4 col-span-2 sm:col-span-1">
          <p className="text-sm text-red-600">Inactive</p>
          <h3 className="text-2xl font-bold text-red-600 mt-1">
            {projects.filter((p) => !p.isActive).length}
          </h3>
        </div>
      </div>

      {/* Project List */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Your Projects</h3>
          <span className="text-xs text-gray-400">
            {projects.length} projects
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-2xl">
            <FiFolder className="mx-auto text-4xl text-gray-300 mb-3" />
            <h3 className="font-semibold text-gray-700">No projects found</h3>
            <p className="text-sm text-gray-400 mt-1">
              Start by adding your first project.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="group flex items-center gap-3 sm:gap-4 border border-gray-100 hover:border-blue-200 hover:shadow-sm rounded-xl p-4 transition"
              >
                {/* Order Number */}
                <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                  {index + 1}
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 truncate">
                    Project ID: {project.id}
                  </p>

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        project.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {project.isActive ? "Published" : "Hidden"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* Active / Inactive */}
                  <select
                    value={project.isActive ? "true" : "false"}
                    onChange={(e) => {
                      const nextValue = e.target.value === "true";

                      if (nextValue !== project.isActive) {
                        toggleStatus(project);
                      }
                    }}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium outline-none cursor-pointer ${
                      project.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>

                  {/* Move Up */}
                  <button
                    onClick={() => moveProject(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                    className="border rounded-lg p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                  >
                    <FiArrowUp size={18} />
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={() => moveProject(index, 1)}
                    disabled={index === projects.length - 1}
                    title="Move down"
                    className="border rounded-lg p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                  >
                    <FiArrowDown size={18} />
                  </button>

                  {/* Edit Button */}
                  <EditProjectsModal
                    project={project}
                    onUpdated={fetchProjects}
                  />

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 rounded-lg px-3 py-2.5 text-sm transition flex items-center gap-2 cursor-pointer"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllprojectPage;