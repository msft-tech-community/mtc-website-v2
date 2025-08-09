import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, ImageIcon, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ComingSoon.css";

const ComingSoon = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
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

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
            },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="coming-soon-container">
            <div className="coming-soon-background">
                <div className="gradient-overlay"></div>
                <div className="animated-particles"></div>
            </div>

            <motion.div
                className="coming-soon-content"
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

                <motion.div
                    className="coming-soon-main"
                    variants={itemVariants}
                >
                    <motion.div
                        className="clock-icon"
                        variants={iconVariants}
                        animate="pulse"
                    >
                        <Clock size={80} />
                    </motion.div>

                    <motion.h1
                        className="coming-soon-title"
                        variants={itemVariants}
                    >
                        Coming Soon
                    </motion.h1>

                    <motion.p
                        className="coming-soon-description"
                        variants={itemVariants}
                    >
                        We're working hard to bring you something amazing. These
                        sections will be available soon with exciting features
                        and content.
                    </motion.p>

                    <motion.div
                        className="features-preview"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="feature-card"
                            variants={pulseVariants}
                            animate="pulse"
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <Users size={40} />
                            <h3>Team</h3>
                            <p>
                                Meet our amazing team members and their
                                contributions
                            </p>
                        </motion.div>

                        <motion.div
                            className="feature-card"
                            variants={pulseVariants}
                            animate="pulse"
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <ImageIcon size={40} />
                            <h3>Gallery</h3>
                            <p>
                                Explore our photo gallery and memorable moments
                            </p>
                        </motion.div>

                        <motion.div
                            className="feature-card"
                            variants={pulseVariants}
                            animate="pulse"
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <Calendar size={40} />
                            <h3>Events</h3>
                            <p>Discover upcoming events and workshops</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="coming-soon-footer"
                        variants={itemVariants}
                    >
                        <p>Stay tuned for updates!</p>
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
