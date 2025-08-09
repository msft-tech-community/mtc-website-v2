import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Code2,
    Users,
    Calendar,
    Award,
    Rocket,
    Heart,
    Sparkles,
    Zap,
    Target,
    Globe,
} from "lucide-react";
import "./HighlightList.css";

const HighlightList = () => {
    const navigate = useNavigate();
    const highlights = [
        {
            id: 1,
            icon: Code2,
            title: "Learn Modern Technologies",
            description:
                "Master cutting-edge frameworks, languages, and tools with hands-on workshops and expert guidance.",
            color: "#667eea",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
            id: 2,
            icon: Users,
            title: "Build Your Network",
            description:
                "Connect with like-minded developers, industry professionals, and potential collaborators.",
            color: "#f093fb",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        {
            id: 3,
            icon: Calendar,
            title: "Attend Exclusive Events",
            description:
                "Join hackathons, tech talks, workshops, and networking sessions throughout the year.",
            color: "#4facfe",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        },
        {
            id: 4,
            icon: Award,
            title: "Earn Certifications",
            description:
                "Get recognized for your skills with industry-standard certifications and completion badges.",
            color: "#43e97b",
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        },
        {
            id: 5,
            icon: Rocket,
            title: "Launch Your Career",
            description:
                "Get mentorship, career guidance, and internship opportunities from industry experts.",
            color: "#fa709a",
            gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        },
        {
            id: 6,
            icon: Globe,
            title: "Global Community",
            description:
                "Be part of a worldwide network of developers and tech enthusiasts sharing knowledge.",
            color: "#a8edea",
            gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        },
    ];

    const stats = [
        { icon: Users, value: "500+", label: "Members", color: "#667eea" },
        { icon: Calendar, value: "50+", label: "Events", color: "#f093fb" },
        { icon: Code2, value: "100+", label: "Projects", color: "#4facfe" },
        {
            icon: Award,
            value: "25+",
            label: "Certifications",
            color: "#43e97b",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.8,
                bounce: 0.4,
            },
        },
    };

    const statsVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 0.6,
            },
        },
    };

    return (
        <section id="highlights" className="highlights-section">
            <div className="highlights-background">
                <div className="gradient-orbs">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`gradient-orb orb-${i + 1}`}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="highlights-main-wrapper">
                <motion.div
                    className="highlights-header"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <motion.div
                        className="section-badge"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles size={16} />
                        <span>Why Choose Us</span>
                    </motion.div>
                    <h2 className="highlights-title">
                        <span className="title-gradient">Unlock Your</span>
                        <br />
                        <span className="title-cursive">Tech Potential</span>
                    </h2>
                    <p className="highlights-subtitle">
                        Join a community that empowers you to learn, grow, and
                        excel in the world of technology
                    </p>
                </motion.div>

                <motion.div
                    className="highlights-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {highlights.map((highlight, index) => {
                        const Icon = highlight.icon;
                        return (
                            <motion.div
                                key={highlight.id}
                                className="highlight-card"
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <div className="card-number">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <motion.div
                                    className="card-icon"
                                    style={{ background: highlight.gradient }}
                                    whileHover={{
                                        rotate: 360,
                                        scale: 1.1,
                                    }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Icon size={24} color="white" />
                                </motion.div>

                                <div className="card-content">
                                    <h3 className="card-title">
                                        {highlight.title}
                                    </h3>
                                    <p className="card-description">
                                        {highlight.description}
                                    </p>
                                </div>

                                <motion.div
                                    className="card-glow"
                                    style={{ background: highlight.gradient }}
                                    whileHover={{ opacity: 0.2 }}
                                />

                                <div
                                    className="card-border"
                                    style={{ background: highlight.gradient }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    className="highlights-stats"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <motion.div
                        className="stats-container"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="stat-item"
                                    variants={statsVariants}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -5,
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <div
                                        className="stat-icon"
                                        style={{ color: stat.color }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div
                                        className="stat-value"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="stat-label">
                                        {stat.label}
                                    </div>

                                    <motion.div
                                        className="stat-pulse"
                                        style={{ backgroundColor: stat.color }}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.5,
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="highlights-cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <motion.button
                        className="cta-button"
                        onClick={() => navigate("/join")}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Start Your Journey</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Rocket size={18} />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HighlightList;
