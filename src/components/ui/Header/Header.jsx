import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle navigation - internal scrolling for home page sections
    const handleNavigation = (item) => {
        // If we're not on the home page and trying to access home sections
        if (location.pathname !== "/" && (item.section || item.path === "/")) {
            navigate("/");
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                if (item.section) {
                    scrollToSection(item.section);
                }
            }, 100);
        }
        // If we're on home page and it's a section link
        else if (location.pathname === "/" && item.section) {
            scrollToSection(item.section);
        }
        // For external pages, navigate normally
        else if (item.path && item.path !== "/") {
            navigate(item.path);
        }

        // Close mobile menu
        setIsMobileMenuOpen(false);
    };

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80; // Account for fixed header
            const targetPosition = element.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    };

    const navItems = [
        { name: "Home", path: "/", section: "hero" },
        { name: "About", section: "highlights" }, // Links to highlights section
        { name: "Events", path: "/events" }, // Coming Soon page
        { name: "Team", path: "/team" }, // Coming Soon page
        { name: "Gallery", path: "/gallery" }, // Coming Soon page
        { name: "Contact", path: "/contact-page" }, // Dedicated contact page
    ];

    return (
        <motion.header
            className={`modern-header ${isScrolled ? "scrolled" : ""}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <nav className="container">
                <div className="nav-content">
                    {/* Logo */}
                    <motion.div
                        className="logo-section"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link to="/" className="logo-link">
                            <div className="microsoft-logo-small">
                                <div className="logo-square-small red"></div>
                                <div className="logo-square-small green"></div>
                                <div className="logo-square-small blue"></div>
                                <div className="logo-square-small yellow"></div>
                            </div>
                            <div className="logo-text">
                                <h1 className="brand-title">
                                    Microsoft Tech Community
                                </h1>
                                <p className="brand-subtitle">
                                    Amity University
                                </p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => handleNavigation(item)}
                                    className={`nav-link ${
                                        (location.pathname === "/" &&
                                            item.section) ||
                                        location.pathname === item.path
                                            ? "active"
                                            : ""
                                    }`}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "inherit",
                                        font: "inherit",
                                    }}
                                >
                                    {item.name}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Join Button */}
                    <motion.button
                        className="join-button"
                        onClick={() => navigate("/join")}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Community
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
                    initial={false}
                    animate={
                        isMobileMenuOpen
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="mobile-nav-items">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={
                                    isMobileMenuOpen
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -20 }
                                }
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => handleNavigation(item)}
                                    className="mobile-nav-link"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "inherit",
                                        font: "inherit",
                                        width: "100%",
                                        textAlign: "left",
                                    }}
                                >
                                    {item.name}
                                </button>
                            </motion.div>
                        ))}
                        <motion.button
                            className="mobile-join-btn"
                            onClick={() => {
                                navigate("/join");
                                setIsMobileMenuOpen(false);
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isMobileMenuOpen
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ delay: 0.6 }}
                        >
                            Join Community
                        </motion.button>
                    </div>
                </motion.div>
            </nav>
        </motion.header>
    );
}
