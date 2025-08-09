import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    User,
    MessageCircle,
    CheckCircle,
    AlertCircle,
    Building,
    Globe,
    Users,
    ArrowRight,
    Sparkles,
    Heart,
} from "lucide-react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [focusedField, setFocusedField] = useState(null);
    const formRef = useRef(null);
    const isInView = useInView(formRef, { once: true });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const categories = [
        { value: "general", label: "General Inquiry", icon: MessageCircle },
        { value: "collaboration", label: "Collaboration", icon: Users },
        { value: "events", label: "Events", icon: Sparkles },
        { value: "membership", label: "Membership", icon: Heart },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Discord webhook URL - you'll replace this with your actual webhook
        const webhookUrl =
            "https://discord.com/api/webhooks/1403634799037382757/TeVrL7_DCvM8PkrDdsaDgQrCJmQm5Q9oqJRc_mQMxJk3AON3ZBETyH8sZb2xJc-0tw9R";

        const categoryEmoji = {
            general: "💬",
            collaboration: "🤝",
            events: "✨",
            membership: "❤️",
        };

        const discordMessage = {
            embeds: [
                {
                    title: `${
                        categoryEmoji[formData.category]
                    } New Contact Form Submission`,
                    color: 0x667eea,
                    fields: [
                        {
                            name: " Name",
                            value: formData.name,
                            inline: true,
                        },
                        {
                            name: " Email",
                            value: formData.email,
                            inline: true,
                        },
                        {
                            name: " Category",
                            value:
                                categories.find(
                                    (cat) => cat.value === formData.category
                                )?.label || formData.category,
                            inline: true,
                        },
                        {
                            name: " Subject",
                            value: formData.subject,
                            inline: false,
                        },
                        {
                            name: " Message",
                            value: formData.message,
                            inline: false,
                        },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Microsoft Tech Community - Contact Form",
                        icon_url:
                            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
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
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    category: "general",
                });
                // Auto-hide success message after 5 seconds
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus("error");
                setTimeout(() => setSubmitStatus(null), 5000);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const formVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const fieldVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
            },
        },
    };

    return (
        <div className="contact-page">
            {/* Enhanced Background */}
            <div className="contact-background">
                <div className="gradient-overlay"></div>
                <div className="animated-particles"></div>
                <div className="floating-shapes">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`floating-shape shape-${i + 1}`}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            <motion.div
                className="contact-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Section */}
                <motion.div className="contact-hero" variants={itemVariants}>
                    <div className="hero-content">
                        <motion.div
                            className="hero-badge"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Sparkles size={20} />
                            <span>Let's Connect</span>
                        </motion.div>
                        <h1>
                            <span className="gradient-text">Get In Touch</span>
                        </h1>
                        <p>
                            Ready to join our community or have questions? We're
                            here to help you connect, learn, and grow with
                            Microsoft technologies.
                        </p>
                    </div>
                </motion.div>

                <div className="contact-layout">
                    {/* Contact Information Cards */}
                    <motion.div
                        className="contact-info-grid"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="info-card featured-card"
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="card-glow"></div>
                            <div className="card-header">
                                <div className="card-icon primary">
                                    <Building size={28} />
                                </div>
                                <h3>Visit Us</h3>
                            </div>
                            <div className="card-content">
                                <p>
                                    <strong>Microsoft Tech Community</strong>
                                </p>
                                <p>Amity University, Sector 125</p>
                                <p>Noida, Uttar Pradesh 201303</p>
                            </div>
                            <div className="card-footer">
                                <MapPin size={16} />
                                <span>Main Campus</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className="info-card"
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="card-header">
                                <div className="card-icon">
                                    <Mail size={24} />
                                </div>
                                <h3>Email Us</h3>
                            </div>
                            <div className="card-content">
                                <p>mtc@amity.edu</p>
                                <p className="card-subtitle">
                                    We reply within 24 hours
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="info-card"
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="card-header">
                                <div className="card-icon">
                                    <Phone size={24} />
                                </div>
                                <h3>Call Us</h3>
                            </div>
                            <div className="card-content">
                                <p>+91 12345 67890</p>
                                <p className="card-subtitle">
                                    Mon-Fri, 9AM-6PM
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="info-card social-card"
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="card-header">
                                <div className="card-icon">
                                    <Globe size={24} />
                                </div>
                                <h3>Follow Us</h3>
                            </div>
                            <div className="social-links-modern">
                                <motion.a
                                    href="#"
                                    className="social-btn discord"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Discord
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="social-btn linkedin"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    LinkedIn
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="social-btn github"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    GitHub
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Contact Form */}
                    <motion.div
                        ref={formRef}
                        className="contact-form-container"
                        variants={formVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <div className="form-header">
                            <h2>Send us a Message</h2>
                            <p>
                                Tell us how we can help you on your tech journey
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="modern-contact-form"
                        >
                            {/* Category Selection */}
                            <motion.div
                                className="form-section"
                                variants={fieldVariants}
                            >
                                <label className="form-label">
                                    <MessageCircle size={18} />
                                    What's this about?
                                </label>
                                <div className="category-grid">
                                    {categories.map((category) => {
                                        const IconComponent = category.icon;
                                        return (
                                            <motion.label
                                                key={category.value}
                                                className={`category-option ${
                                                    formData.category ===
                                                    category.value
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category.value}
                                                    checked={
                                                        formData.category ===
                                                        category.value
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                                <div className="category-content">
                                                    <IconComponent size={20} />
                                                    <span>
                                                        {category.label}
                                                    </span>
                                                </div>
                                            </motion.label>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Personal Information Row */}
                            <div className="form-row">
                                <motion.div
                                    className="form-group"
                                    variants={fieldVariants}
                                >
                                    <label className="form-label">
                                        <User size={18} />
                                        Your Name
                                    </label>
                                    <div
                                        className={`input-wrapper ${
                                            focusedField === "name"
                                                ? "focused"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus("name")}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        <div className="input-highlight"></div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="form-group"
                                    variants={fieldVariants}
                                >
                                    <label className="form-label">
                                        <Mail size={18} />
                                        Email Address
                                    </label>
                                    <div
                                        className={`input-wrapper ${
                                            focusedField === "email"
                                                ? "focused"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your.email@domain.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus("email")}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        <div className="input-highlight"></div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Subject */}
                            <motion.div
                                className="form-group"
                                variants={fieldVariants}
                            >
                                <label className="form-label">
                                    <MessageCircle size={18} />
                                    Subject
                                </label>
                                <div
                                    className={`input-wrapper ${
                                        focusedField === "subject"
                                            ? "focused"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Brief description of your message"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus("subject")}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <div className="input-highlight"></div>
                                </div>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                className="form-group"
                                variants={fieldVariants}
                            >
                                <label className="form-label">
                                    <MessageCircle size={18} />
                                    Your Message
                                </label>
                                <div
                                    className={`input-wrapper textarea-wrapper ${
                                        focusedField === "message"
                                            ? "focused"
                                            : ""
                                    }`}
                                >
                                    <textarea
                                        name="message"
                                        placeholder="Tell us more about your inquiry, goals, or how we can help you..."
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus("message")}
                                        onBlur={handleBlur}
                                        required
                                    ></textarea>
                                    <div className="input-highlight"></div>
                                </div>
                                <div className="character-count">
                                    {formData.message.length}/500
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                className="form-actions"
                                variants={fieldVariants}
                            >
                                <motion.button
                                    type="submit"
                                    className="submit-button-modern"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <div className="button-content">
                                        {isSubmitting ? (
                                            <div className="loading-animation">
                                                <div className="loading-dots">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <span>Sending Message...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                <span>Send Message</span>
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </div>
                                    <div className="button-shine"></div>
                                </motion.button>
                            </motion.div>

                            {/* Status Message */}
                            {submitStatus && (
                                <motion.div
                                    className={`status-message-modern ${submitStatus}`}
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                >
                                    <div className="status-icon">
                                        {submitStatus === "success" ? (
                                            <CheckCircle size={24} />
                                        ) : (
                                            <AlertCircle size={24} />
                                        )}
                                    </div>
                                    <div className="status-content">
                                        {submitStatus === "success" ? (
                                            <>
                                                <h4>
                                                    Message Sent Successfully!
                                                </h4>
                                                <p>
                                                    Thanks for reaching out.
                                                    We'll get back to you within
                                                    24 hours.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h4>Something went wrong</h4>
                                                <p>
                                                    Please try again or contact
                                                    us directly via email.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
