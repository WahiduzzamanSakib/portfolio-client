
"use client";

import { useEffect, useState } from "react";

import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";

import { FiEdit2 } from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

export function EditModal({ profile, onSaved }) {
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        location: "",
        description: "",
        portfolio: "",
        github: "",
        linkedin: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Load existing profile data
    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                designation: profile.designation || "",
                location: profile.location || "",
                description: profile.description || "",
                portfolio: profile.portfolio || "",
                github: profile.github || "",
                linkedin: profile.linkedin || "",
            });
        }
    }, [profile]);

    // Handle input changes
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Save profile data
    const handleSave = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const { error } = await authClient.updateUser({
                name: formData.name,
                designation: formData.designation,
                location: formData.location,
                description: formData.description,
                portfolio: formData.portfolio,
                github: formData.github,
                linkedin: formData.linkedin,
            });

            if (error) {
                setErrorMessage(
                    error.message || "Profile update failed"
                );
                return;
            }
            window.location.reload();
            onSaved?.();


        } catch (error) {
            setErrorMessage(
                error.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            <Button color="primary">
                <FiEdit2 />
                Edit Profile
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="w-full sm:max-w-xl">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>
                                Update Profile
                            </Modal.Heading>

                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Update your personal information below.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                <form
                                    onSubmit={handleSave}
                                    className="flex flex-col gap-5"
                                >

                                    {/* Name */}
                                    <TextField
                                        className="w-full"
                                        name="name"
                                        variant="secondary"
                                    >
                                        <Label>Name</Label>

                                        <Input
                                            value={formData.name}
                                            onChange={(e) =>
                                                handleChange("name", e.target.value)
                                            }
                                            placeholder="Enter your name"
                                        />
                                    </TextField>

                                    {/* Designation */}
                                    <TextField
                                        className="w-full"
                                        name="designation"
                                        variant="secondary"
                                    >
                                        <Label>Designation</Label>

                                        <Input
                                            value={formData.designation}
                                            onChange={(e) =>
                                                handleChange("designation", e.target.value)
                                            }
                                            placeholder="Enter your designation"
                                        />
                                    </TextField>

                                    {/* Location */}
                                    <TextField
                                        className="w-full"
                                        name="location"
                                        variant="secondary"
                                    >
                                        <Label>Location</Label>

                                        <Input
                                            value={formData.location}
                                            onChange={(e) =>
                                                handleChange("location", e.target.value)
                                            }
                                            placeholder="Enter your location"
                                        />
                                    </TextField>

                                    {/* Description */}
                                    <TextField
                                        className="w-full"
                                        name="description"
                                        variant="secondary"
                                    >
                                        <Label>About Me</Label>

                                        <Input
                                            value={formData.description}
                                            onChange={(e) =>
                                                handleChange("description", e.target.value)
                                            }
                                            placeholder="Enter your description"
                                        />
                                    </TextField>

                                    {/* Portfolio */}
                                    <TextField
                                        className="w-full"
                                        name="portfolio"
                                        variant="secondary"
                                    >
                                        <Label>Portfolio</Label>

                                        <Input
                                            value={formData.portfolio}
                                            onChange={(e) =>
                                                handleChange("portfolio", e.target.value)
                                            }
                                            placeholder="Enter portfolio URL"
                                        />
                                    </TextField>

                                    {/* GitHub */}
                                    <TextField
                                        className="w-full"
                                        name="github"
                                        variant="secondary"
                                    >
                                        <Label>GitHub</Label>

                                        <Input
                                            value={formData.github}
                                            onChange={(e) =>
                                                handleChange("github", e.target.value)
                                            }
                                            placeholder="Enter GitHub URL"
                                        />
                                    </TextField>

                                    {/* LinkedIn */}
                                    <TextField
                                        className="w-full"
                                        name="linkedin"
                                        variant="secondary"
                                    >
                                        <Label>LinkedIn</Label>

                                        <Input
                                            value={formData.linkedin}
                                            onChange={(e) =>
                                                handleChange("linkedin", e.target.value)
                                            }
                                            placeholder="Enter LinkedIn URL"
                                        />
                                    </TextField>

                                    {/* Error Message */}
                                    {errorMessage && (
                                        <p className="text-sm text-red-500">
                                            {errorMessage}
                                        </p>
                                    )}

                                    {/* Footer */}
                                    <Modal.Footer>

                                        <Button
                                            slot="close"
                                            variant="secondary"
                                            type="button"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            isDisabled={loading}
                                        >
                                            {loading
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </Button>

                                    </Modal.Footer>

                                </form>

                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
