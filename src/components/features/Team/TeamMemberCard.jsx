import { useState } from "react";
import "../../ui/HeroSection/HeroSection.css";
import "./TeamMemberCard.css";

const members = [
    {
        name: "MR. X",
        role: "Frontend Lead",
        avatar: "/images/avatar1.png",
        achievements: [
            "Built the club website",
            "Organized 3 hackathons",
            "Mentored 20+ students",
        ],
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        email: "mailto:shlokbhardwaj1@gmail.com",
    },
    {
        name: "MS. Y",
        role: "Full Stack Lead",
        avatar: "/images/image 20.jpg",
        achievements: [
            "Microsoft Season of AI Speaker",
            "Multiple hackathon position holder",
            "Entrepreneur,Fullstack Expert ",
        ],
        linkedin: "https://linkedin.com/in/shlokbhardwaj",
        github: "https://github.com/FortxArcader",
        email: "mailto:shlokbhardwaj1@gmail.com",
    },
    {
        name: "MR. X",
        role: "Frontend Lead",
        avatar: "/images/avatar1.png",
        achievements: [
            "Built the club website",
            "Organized 3 hackathons",
            "Mentored 20+ students",
        ],
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        email: "mailto:shlokbhardwaj1@gmail.com",
    },
    {
        name: "MS. Y",
        role: "Full Stack Lead",
        avatar: "",
        achievements: [
            "Microsoft Season of AI Speaker",
            "Multiple hackathon position holder",
            "Entrepreneur,Fullstack Expert ",
        ],
        linkedin: "https://linkedin.com/in/shlokbhardwaj",
        github: "https://github.com/FortxArcader",
        email: "mailto:shlokbhardwaj1@gmail.com",
    },
];

const slides = [];
for (let i = 0; i < members.length; i += 2) {
    slides.push(members.slice(i, i + 2));
}

export default function TeamMemberCard() {
    const [current, setCurrent] = useState(0);

    return (
        <div id="team" className="hero-bg py-5">
            <section className="container">
                {/* Updated: Changed from "MEMBER MILESTONES" to "Member Milestones" and unified styling */}
                <h2
                    className="text-center mb-5 display-5 fw-bold"
                    style={{ color: "#fff", letterSpacing: "1px" }}
                >
                    Member Milestones
                </h2>
                <div className="row justify-content-center">
                    {slides[current].map((member, idx) => (
                        <div
                            key={idx}
                            className="col-md-5 mx-3 mb-4 d-flex flex-column align-items-center"
                        >
                            <div
                                className="team-card-glass p-4 w-100"
                                style={{ maxWidth: 400 }}
                            >
                                <div className="d-flex flex-column align-items-center">
                                    <div className="team-avatar-glow mb-3">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="rounded-circle border border-3"
                                            style={{
                                                width: 120,
                                                height: 120,
                                                objectFit: "cover",
                                                background: "#222",
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="fw-bold text-center mb-1"
                                        style={{
                                            color: "#fff",
                                            fontSize: 22,
                                            letterSpacing: 1,
                                        }}
                                    >
                                        {member.name}
                                    </div>
                                    <div
                                        className="text-center mb-2"
                                        style={{
                                            color: "#bfc6e0",
                                            fontSize: 16,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {member.role}
                                    </div>
                                    <div className="d-flex gap-3 mb-3">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="team-social-link"
                                            aria-label="LinkedIn"
                                        >
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="team-social-link"
                                            aria-label="GitHub"
                                        >
                                            <i className="bi bi-github"></i>
                                        </a>
                                        <a
                                            href={member.email}
                                            className="team-social-link"
                                            aria-label="Email"
                                        >
                                            <i className="bi bi-envelope"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="team-achievement-card px-3 py-3 mt-2 w-100">
                                    <div
                                        className="mb-2"
                                        style={{ fontSize: 20 }}
                                    >
                                        <span role="img" aria-label="clap">
                                            👏
                                        </span>{" "}
                                        Achievements
                                    </div>
                                    <ul
                                        className="mb-0 ps-3"
                                        style={{
                                            color: "#bfc6e0",
                                            fontSize: 16,
                                        }}
                                    >
                                        {member.achievements.map((ach, i) => (
                                            <li
                                                key={i}
                                                style={{ marginBottom: 8 }}
                                            >
                                                {ach}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Dots navigation */}
                <div className="d-flex justify-content-center mt-4">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            className="hero-dot"
                            style={{
                                width: 18,
                                height: 10,
                                borderRadius: 8,
                                margin: "0 6px",
                                background: idx === current ? "#fff" : "#bbb",
                                border: "none",
                                outline: "none",
                                transition: "background 0.3s",
                            }}
                            onClick={() => setCurrent(idx)}
                            aria-label={`Go to team slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
