"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "@heroui/react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { LuSave } from "react-icons/lu";
import { HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

const emptyForm = {
  id: "",
  title: "",
  desc: "",
  image: "",
  tags: "",
  clientRepo: "",
  serverRepo: "",
  live: "",
  isActive: true,
};

export function EditProjectsModal({ project, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [features, setFeatures] = useState([""]);
  const [challenges, setChallenges] = useState([""]);
  const [futurePlans, setFuturePlans] = useState([""]);

  const [formData, setFormData] = useState(emptyForm);

  // Fill the form from the project every time the modal opens,
  // so cancelled edits don't linger the next time it is opened.
  useEffect(() => {
    if (!open || !project) return;

    setFormData({
      id: project.id || "",
      title: project.title || "",
      desc: project.desc || "",
      image: project.image || "",
      tags: project.tags?.join(", ") || "",
      clientRepo: project.clientRepo || "",
      serverRepo: project.serverRepo || "",
      live: project.live || "",
      isActive: project.isActive ?? true,
    });

    setFeatures(project.features?.length ? project.features : [""]);
    setChallenges(project.challenges?.length ? project.challenges : [""]);
    setFuturePlans(project.futurePlans?.length ? project.futurePlans : [""]);
  }, [project, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addField = (state, setState) => {
    setState([...state, ""]);
  };

  const removeField = (index, state, setState) => {
    setState(state.filter((_, i) => i !== index));
  };

  const handleArrayChange = (index, value, state, setState) => {
    const updated = [...state];
    updated[index] = value;
    setState(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!project?._id) {
      toast.error("Project not found!");
      return;
    }

    const updatedData = {
      id: formData.id.trim(),
      title: formData.title.trim(),
      desc: formData.desc.trim(),
      image: formData.image.trim(),

      tags: formData.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      features: features.map((item) => item.trim()).filter(Boolean),
      challenges: challenges.map((item) => item.trim()).filter(Boolean),
      futurePlans: futurePlans.map((item) => item.trim()).filter(Boolean),

      clientRepo: formData.clientRepo.trim(),
      serverRepo: formData.serverRepo.trim() || null,
      live: formData.live.trim(),
      isActive: formData.isActive,
    };

    // Send only the fields that actually changed
    const changedData = {};

    Object.keys(updatedData).forEach((key) => {
      let oldValue = project[key];

      if (key === "serverRepo") oldValue = oldValue || null;
      if (Array.isArray(updatedData[key])) oldValue = oldValue ?? [];
      if (typeof updatedData[key] === "string") oldValue = oldValue ?? "";

      if (JSON.stringify(updatedData[key]) !== JSON.stringify(oldValue)) {
        changedData[key] = updatedData[key];
      }
    });

    if (Object.keys(changedData).length === 0) {
      toast.info("No changes detected");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/projects/${project._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedData),
      });

      const result = await res.json();

      if (!res.ok || result.matchedCount === 0) {
        throw new Error(result.message || "Project update failed!");
      }

      toast.success("Project updated successfully!");

      setOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";

  const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1";

  const arraySections = [
    {
      title: "Project Features",
      state: features,
      setState: setFeatures,
      placeholder: "Feature",
    },
    {
      title: "Challenges",
      state: challenges,
      setState: setChallenges,
      placeholder: "Challenge",
    },
    {
      title: "Future Plans",
      state: futurePlans,
      setState: setFuturePlans,
      placeholder: "Future Plan",
    },
  ];

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
      >
        <FiEdit className="text-blue-600" size={16} />
        <span>Edit</span>
      </button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-2xl w-full max-h-[90vh] flex flex-col bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            <Modal.CloseTrigger />

            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">
                Edit Project Details
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Update your project information.
              </p>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Basic Information */}
                <div>
                  <h3 className="font-bold text-base mb-4">
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Project ID</label>
                      <input
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Project Title</label>
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        name="desc"
                        rows={4}
                        value={formData.desc}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>

                <hr />

                {/* Technologies & Image */}
                <div>
                  <h3 className="font-bold text-base mb-4">
                    Technologies & Image
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Technologies</label>
                      <input
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="React, Next.js, MongoDB"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Project Image URL</label>
                      <input
                        name="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <hr />

                {/* Dynamic Arrays */}
                {arraySections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-bold text-base mb-4">
                      {section.title}
                    </h3>

                    {section.state.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 mb-3"
                      >
                        <input
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(
                              index,
                              e.target.value,
                              section.state,
                              section.setState
                            )
                          }
                          placeholder={`${section.placeholder} ${index + 1}`}
                          className={inputClass}
                        />

                        {section.state.length > 1 && (
                          <Button
                            type="button"
                            color="danger"
                            variant="flat"
                            isIconOnly
                            onPress={() =>
                              removeField(
                                index,
                                section.state,
                                section.setState
                              )
                            }
                          >
                            <FiTrash2 />
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      color="primary"
                      variant="flat"
                      onPress={() =>
                        addField(section.state, section.setState)
                      }
                    >
                      <FiPlus />
                      Add {section.placeholder}
                    </Button>
                  </div>
                ))}

                <hr />

                {/* Project Links */}
                <div>
                  <h3 className="font-bold text-base mb-4">Project Links</h3>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Live Website URL</label>
                      <input
                        name="live"
                        type="url"
                        value={formData.live}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Client Repository URL
                      </label>
                      <input
                        name="clientRepo"
                        type="url"
                        value={formData.clientRepo}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Server Repository URL
                      </label>
                      <input
                        name="serverRepo"
                        type="url"
                        value={formData.serverRepo}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <hr />

               

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                  >
                    <LuSave />
                    <span>
                      {loading ? "Saving Changes..." : "Save Changes"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}