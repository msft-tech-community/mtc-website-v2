import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingAnimation.css";

const LoadingAnimation = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentPhase, setCurrentPhase] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentPhase < 3) {
                setCurrentPhase(currentPhase + 1);
            } else {
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(onComplete, 500);
                }, 1000);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [currentPhase, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="loading-content">
                        {/* Microsoft Logo Animation */}
                        <motion.div
                            className="logo-container"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="microsoft-logo">
                                <div className="logo-square red"></div>
                                <div className="logo-square green"></div>
                                <div className="logo-square blue"></div>
                                <div className="logo-square yellow"></div>
                            </div>
                        </motion.div>

                        {/* Text Animation */}
                        <motion.div
                            className="text-container"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <motion.h1
                                className="main-title"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                {"Microsoft Tech Community"
                                    .split("")
                                    .map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.8 + index * 0.05,
                                                duration: 0.3,
                                            }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                            </motion.h1>

                            <motion.p
                                className="subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2, duration: 0.6 }}
                            >
                                Amity University
                            </motion.p>
                        </motion.div>

                        {/* Progress Animation */}
                        <motion.div
                            className="progress-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5, duration: 0.5 }}
                        >
                            <div className="progress-bar">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        delay: 2.8,
                                        duration: 1.5,
                                        ease: "easeInOut",
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="particle"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    x: Math.random() * 200 - 100,
                                    y: Math.random() * 200 - 100,
                                }}
                                transition={{
                                    delay: 1 + i * 0.2,
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingAnimation;
