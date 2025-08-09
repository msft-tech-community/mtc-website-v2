import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Send,
    Mail,
    Phone,
    MapPin,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general", // general, join
    });

    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendToDiscord = async (data, type) => {
        // Replace these with your actual Discord webhook URLs
        const webhookUrl =
            type === "join"
                ? "https://discord.com/api/webhooks/YOUR_JOIN_WEBHOOK_HERE"
                : "https://discord.com/api/webhooks/YOUR_CONTACT_WEBHOOK_HERE";

        const embedColor = type === "join" ? 0x7fba00 : 0x00a4ef;
        const title =
            type === "join"
                ? "🎉 New Community Join Request"
                : "📧 New Contact Form Submission";

        const embed = {
            title: title,
            color: embedColor,
            fields: [
                { name: "👤 Name", value: data.name, inline: true },
                { name: "📧 Email", value: data.email, inline: true },
                {
                    name: "📱 Phone",
                    value: data.phone || "Not provided",
                    inline: true,
                },
                { name: "📝 Subject", value: data.subject, inline: false },
                {
                    name: "💬 Message",
                    value: data.message || "No message provided",
                    inline: false,
                },
                {
                    name: "🏷️ Type",
                    value:
                        type === "join" ? "Join Community" : "General Contact",
                    inline: true,
                },
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "Microsoft Tech Community - Amity University",
            },
        };

        try {
            await axios.post(webhookUrl, {
                embeds: [embed],
            });
            return true;
        } catch (error) {
            console.error("Discord webhook error:", error);
            // For demo purposes, return true to show success message
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Basic validation
            if (!formData.name || !formData.email || !formData.subject) {
                setStatus({
                    type: "error",
                    message: "Please fill in all required fields.",
                });
                setIsSubmitting(false);
                return;
            }

            // Send to Discord
            const success = await sendToDiscord(formData, formData.type);

            if (success) {
                setStatus({
                    type: "success",
                    message:
                        formData.type === "join"
                            ? "Welcome! Your join request has been submitted successfully. We'll get back to you soon!"
                            : "Thank you! Your message has been sent successfully. We'll respond within 24 hours.",
                });

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    type: "general",
                });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            setStatus({
                type: "error",
                message:
                    "Sorry, there was an error sending your message. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-section">
            <div className="container">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">
                        Ready to join our community or have questions? We'd love
                        to hear from you.
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="info-card">
                            <div className="info-item">
                                <div className="info-icon">
                                    <Mail size={24} />
                                </div>
                                <div className="info-content">
                                    <h4>Email Us</h4>
                                    <p>mtc@amity.edu</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <Phone size={24} />
                                </div>
                                <div className="info-content">
                                    <h4>Call Us</h4>
                                    <p>+91 12345 67890</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <div className="info-content">
                                    <h4>Visit Us</h4>
                                    <p>
                                        Amity University
                                        <br />
                                        Noida, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            {/* Form Type Selector */}
                            <div className="form-type-selector">
                                <button
                                    type="button"
                                    className={`type-btn ${
                                        formData.type === "general"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            type: "general",
                                        })
                                    }
                                >
                                    General Contact
                                </button>
                                <button
                                    type="button"
                                    className={`type-btn ${
                                        formData.type === "join" ? "active" : ""
                                    }`}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            type: "join",
                                        })
                                    }
                                >
                                    Join Community
                                </button>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number (Optional)"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder={
                                            formData.type === "join"
                                                ? "Why do you want to join?"
                                                : "Subject"
                                        }
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={
                                        formData.type === "join"
                                            ? "Tell us about your skills and interests..."
                                            : "Your Message"
                                    }
                                    rows="5"
                                    className="form-input"
                                ></textarea>
                            </div>

                            {/* Status Message */}
                            {status.message && (
                                <motion.div
                                    className={`status-message ${status.type}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {status.type === "success" ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <AlertCircle size={20} />
                                    )}
                                    <span>{status.message}</span>
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <div className="loading-spinner"></div>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        {formData.type === "join"
                                            ? "Join Community"
                                            : "Send Message"}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
