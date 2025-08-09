import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Users,
    Calendar,
    Award,
    Code2,
    ArrowDown,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Zap,
    Heart,
    Star,
    Rocket,
    Globe,
} from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const slides = [
        {
            title: "Microsoft Tech Community",
            subtitle:
                "Empowering students through code, collaboration, and community",
            accent: "Where Innovation Meets Passion",
            stats: [
                {
                    icon: Users,
                    number: "500+",
                    label: "Active Members",
                    color: "#667eea",
                },
                {
                    icon: Calendar,
                    number: "50+",
                    label: "Events Hosted",
                    color: "#764ba2",
                },
                {
                    icon: Award,
                    number: "25+",
                    label: "Certifications",
                    color: "#f093fb",
                },
                {
                    icon: Code2,
                    number: "100+",
                    label: "Projects Built",
                    color: "#4facfe",
                },
            ],
        },
        {
            title: "Join Our Tech Journey",
            subtitle:
                "Learn cutting-edge technologies and build amazing projects together",
            accent: "Code • Create • Collaborate",
            stats: [
                {
                    icon: Code2,
                    number: "10+",
                    label: "Tech Stacks",
                    color: "#43e97b",
                },
                {
                    icon: Users,
                    number: "20+",
                    label: "Workshops",
                    color: "#fa709a",
                },
                {
                    icon: Award,
                    number: "5+",
                    label: "Hackathons Won",
                    color: "#a8edea",
                },
                {
                    icon: Rocket,
                    number: "2024",
                    label: "Established",
                    color: "#fee140",
                },
            ],
        },
        {
            title: "Build the Future",
            subtitle:
                "Connect with like-minded developers and create innovative solutions",
            accent: "Dream • Design • Develop",
            stats: [
                {
                    icon: Globe,
                    number: "15+",
                    label: "Mentors",
                    color: "#667eea",
                },
                {
                    icon: Code2,
                    number: "200+",
                    label: "Code Reviews",
                    color: "#764ba2",
                },
                {
                    icon: Heart,
                    number: "24/7",
                    label: "Community Support",
                    color: "#f093fb",
                },
                {
                    icon: Star,
                    number: "∞",
                    label: "Learning Opportunities",
                    color: "#4facfe",
                },
            ],
        },
    ];

    useEffect(() => {
        if (isHovered) return; // Pause carousel when hovered

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 15000); // Even slower transition - 15 seconds
        return () => clearInterval(timer);
    }, [slides.length, isHovered]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                type: "spring",
                damping: 25,
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
                duration: 1,
            },
        },
    };

    const floatingIcons = [Sparkles, Zap, Heart, Star];

    return (
        <section id="hero" className="hero-section">
            {/* Dynamic Background */}
            <div className="hero-background">
                <div className="animated-shapes">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`floating-orb orb-${i + 1}`}
                            animate={{
                                y: [-30, 30, -30],
                                x: [-20, 20, -20],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 12 + i * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
                <div className="gradient-overlay"></div>
            </div>

            {/* Interactive Mouse Trail */}
            <motion.div
                className="mouse-trail"
                style={{
                    left: mousePosition.x - 15,
                    top: mousePosition.y - 15,
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main Content Container */}
            <motion.div
                className="hero-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Slide Navigation */}
                <motion.button
                    className="slide-nav prev"
                    onClick={prevSlide}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                    className="slide-nav next"
                    onClick={nextSlide}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <ChevronRight size={24} />
                </motion.button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                mass: 1,
                            },
                            opacity: {
                                duration: 0.8,
                                ease: "easeInOut",
                            },
                            scale: {
                                duration: 0.8,
                                ease: "easeInOut",
                            },
                        }}
                        className="slide-content"
                    >
                        {/* Floating Decorative Icons */}
                        <div className="floating-decorations">
                            {floatingIcons.map((Icon, index) => (
                                <motion.div
                                    key={index}
                                    className="floating-decoration"
                                    style={{
                                        left: `${15 + index * 25}%`,
                                        top: `${20 + (index % 2) * 60}%`,
                                    }}
                                    animate={{
                                        y: [-15, 15, -15],
                                        rotate: [0, 8, -8, 0],
                                        scale: [0.8, 1.2, 0.8],
                                    }}
                                    transition={{
                                        duration: 6 + index * 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Icon size={24} />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="accent-badge"
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Sparkles size={18} />
                            {slides[currentSlide].accent}
                        </motion.div>

                        <motion.h1
                            className="hero-title"
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {slides[currentSlide].title
                                .split(" ")
                                .map((word, index) => (
                                    <motion.span
                                        key={index}
                                        className="title-word"
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.15,
                                            duration: 1,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {word}{" "}
                                    </motion.span>
                                ))}
                        </motion.h1>

                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1.2 }}
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 1 }}
                        >
                            <motion.button
                                className="hero-btn primary"
                                onClick={() => navigate("/join")}
                                whileHover={{
                                    scale: 1.08,
                                    y: -3,
                                    boxShadow:
                                        "0 25px 50px rgba(102, 126, 234, 0.4)",
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Join Community</span>
                                <Sparkles size={20} />
                            </motion.button>
                            <motion.button
                                className="hero-btn secondary"
                                onClick={() => navigate("/events")}
                                whileHover={{
                                    scale: 1.08,
                                    y: -3,
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.15)",
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Explore Events</span>
                                <Calendar size={20} />
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 1 }}
                        >
                            {slides[currentSlide].stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="stat-card"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            y: 40,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{
                                            delay: 1.8 + index * 0.15,
                                            duration: 0.8,
                                            type: "spring",
                                            bounce: 0.3,
                                        }}
                                        whileHover={{
                                            scale: 1.08,
                                            y: -8,
                                            boxShadow: `0 25px 50px ${stat.color}30`,
                                        }}
                                    >
                                        <div
                                            className="stat-icon"
                                            style={{
                                                background: `linear-gradient(135deg, ${stat.color}40, ${stat.color}20)`,
                                                borderColor: `${stat.color}60`,
                                            }}
                                        >
                                            <Icon
                                                size={28}
                                                style={{ color: stat.color }}
                                            />
                                        </div>
                                        <div
                                            className="stat-number"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div className="stat-label">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <motion.div
                    className="slide-indicators"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                >
                    {slides.map((_, index) => (
                        <motion.button
                            key={index}
                            className={`slide-indicator ${
                                index === currentSlide ? "active" : ""
                            }`}
                            onClick={() => setCurrentSlide(index)}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    onClick={scrollToNext}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 1 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    ></motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
