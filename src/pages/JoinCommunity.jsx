import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    GraduationCap,
    Code,
    Github,
    Linkedin,
    Send,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./JoinCommunity.css";

const JoinCommunity = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        university: "",
        course: "",
        year: "",
        skills: "",
        experience: "",
        github: "",
        linkedin: "",
        motivation: "",
        interests: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const interests = [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "Cloud Computing",
        "DevOps",
        "UI/UX Design",
        "Cybersecurity",
        "Blockchain",
        "Game Development",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInterestChange = (interest) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Discord webhook URL - you'll replace this with your actual webhook
        const webhookUrl =
            "https://discord.com/api/webhooks/1403636215718219777/vYjZX-4bsw6GRqc7tbwn1kT85UlCZSiKCsYAuHZ3r-pvu3TGXogq6d9xe15TL4-lLzAJ";

        const discordMessage = {
            embeds: [
                {
                    title: "🚀 New Community Application",
                    color: 0x00ff00,
                    fields: [
                        {
                            name: " Name",
                            value: `${formData.firstName} ${formData.lastName}`,
                            inline: true,
                        },
                        {
                            name: " Email",
                            value: formData.email,
                            inline: true,
                        },
                        {
                            name: " Phone",
                            value: formData.phone || "Not provided",
                            inline: true,
                        },
                        {
                            name: " University",
                            value: formData.university,
                            inline: true,
                        },
                        {
                            name: " Course",
                            value: formData.course,
                            inline: true,
                        },
                        {
                            name: " Year",
                            value: formData.year,
                            inline: true,
                        },
                        {
                            name: " Technical Skills",
                            value: formData.skills || "Not specified",
                            inline: false,
                        },
                        {
                            name: " Experience",
                            value: formData.experience || "Not specified",
                            inline: false,
                        },
                        {
                            name: " GitHub",
                            value: formData.github || "Not provided",
                            inline: true,
                        },
                        {
                            name: " LinkedIn",
                            value: formData.linkedin || "Not provided",
                            inline: true,
                        },
                        {
                            name: " Areas of Interest",
                            value:
                                formData.interests.length > 0
                                    ? formData.interests.join(", ")
                                    : "Not specified",
                            inline: false,
                        },
                        {
                            name: "  Motivation",
                            value: formData.motivation,
                            inline: false,
                        },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Microsoft Tech Community - Join Application",
                    },
                },
            ],
        };

        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(discordMessage),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    university: "",
                    course: "",
                    year: "",
                    skills: "",
                    experience: "",
                    github: "",
                    linkedin: "",
                    motivation: "",
                    interests: [],
                });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Error sending application:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="join-community-page">
            <div className="join-background">
                <div className="gradient-overlay"></div>
                <div className="animated-particles"></div>
            </div>

            <motion.div
                className="join-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    className="back-button"
                    onClick={() => navigate("/")}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </motion.button>

                <motion.div className="join-header" variants={itemVariants}>
                    <h1>Join Our Community</h1>
                    <p>
                        Ready to be part of something amazing? Fill out this
                        application to join the Microsoft Tech Community at
                        Amity University.
                    </p>
                </motion.div>

                <motion.div
                    className="join-form-container"
                    variants={itemVariants}
                >
                    <form onSubmit={handleSubmit} className="join-form">
                        {/* Personal Information */}
                        <div className="form-section">
                            <h2>Personal Information</h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <User
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <User
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <Mail
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <Phone
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number (Optional)"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="form-section">
                            <h2>Academic Information</h2>

                            <div className="form-group">
                                <div className="input-wrapper">
                                    <GraduationCap
                                        className="input-icon"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        name="university"
                                        placeholder="University/College"
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <Code
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="text"
                                            name="course"
                                            placeholder="Course/Major"
                                            value={formData.course}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <GraduationCap
                                            className="input-icon"
                                            size={20}
                                        />
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">
                                                Select Year
                                            </option>
                                            <option value="1st Year">
                                                1st Year
                                            </option>
                                            <option value="2nd Year">
                                                2nd Year
                                            </option>
                                            <option value="3rd Year">
                                                3rd Year
                                            </option>
                                            <option value="4th Year">
                                                4th Year
                                            </option>
                                            <option value="Graduate">
                                                Graduate
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Background */}
                        <div className="form-section">
                            <h2>Technical Background</h2>

                            <div className="form-group">
                                <div className="input-wrapper textarea-wrapper">
                                    <textarea
                                        name="skills"
                                        placeholder="Technical Skills (Programming languages, frameworks, tools, etc.)"
                                        rows="3"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper textarea-wrapper">
                                    <textarea
                                        name="experience"
                                        placeholder="Experience (Projects, internships, work experience, etc.)"
                                        rows="3"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <Github
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="url"
                                            name="github"
                                            placeholder="GitHub Profile (Optional)"
                                            value={formData.github}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <Linkedin
                                            className="input-icon"
                                            size={20}
                                        />
                                        <input
                                            type="url"
                                            name="linkedin"
                                            placeholder="LinkedIn Profile (Optional)"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="form-section">
                            <h2>Areas of Interest</h2>
                            <p className="section-description">
                                Select the areas you're most interested in:
                            </p>

                            <div className="interests-grid">
                                {interests.map((interest) => (
                                    <label
                                        key={interest}
                                        className="interest-item"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.interests.includes(
                                                interest
                                            )}
                                            onChange={() =>
                                                handleInterestChange(interest)
                                            }
                                        />
                                        <span className="checkmark"></span>
                                        {interest}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Motivation */}
                        <div className="form-section">
                            <h2>Why Join Us?</h2>

                            <div className="form-group">
                                <div className="input-wrapper textarea-wrapper">
                                    <textarea
                                        name="motivation"
                                        placeholder="Tell us why you want to join the Microsoft Tech Community and what you hope to contribute..."
                                        rows="4"
                                        value={formData.motivation}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Submit Application
                                </>
                            )}
                        </motion.button>

                        {submitStatus && (
                            <motion.div
                                className={`status-message ${submitStatus}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {submitStatus === "success" ? (
                                    <>
                                        <CheckCircle size={20} />
                                        Application submitted successfully!
                                        We'll review it and get back to you
                                        soon.
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle size={20} />
                                        Failed to submit application. Please try
                                        again.
                                    </>
                                )}
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default JoinCommunity;
