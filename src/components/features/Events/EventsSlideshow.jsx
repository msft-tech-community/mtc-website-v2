import { useState, useEffect } from "react";
import "../../ui/HeroSection/HeroSection.css"; // Reuse background and font styles

const events = [
    {
        title: "DSA Conquest",
        date: "14/07/25",
        description:
            "An intense coding competition focusing on data structures and algorithms. Hosted for students to test and strengthen their problem-solving skills.",
        img: "/images/image 18.png", // Place your event image in public/images/
    },
    {
        title: "CSS Flair",
        date: "14/07/25",
        description:
            "An intense coding competition focusing on data structures and algorithms. Hosted for students to test and strengthen their problem-solving skills.",
        img: "/images/image 19.jpg", // Place your event image in public/images/
    },
    // Add more events here as needed
];

export default function EventsSlideshow() {
    const [current, setCurrent] = useState(0);

    // Optional: auto-advance every 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % events.length);
        }, 8000);
        return () => clearTimeout(timer);
    }, [current]);

    const goPrev = () =>
        setCurrent((prev) => (prev - 1 + events.length) % events.length);
    const goNext = () => setCurrent((prev) => (prev + 1) % events.length);

    return (
        <div id="events" className="hero-bg py-5">
            <section className="container d-flex flex-column align-items-center justify-content-center">
                <div className="text-center mb-3">
                    {/* Updated: Unified title styling to match other sections */}
                    <h2
                        className="display-5 fw-bold mb-3"
                        style={{ color: "#fff", letterSpacing: "1px" }}
                    >
                        {events[current].title}
                    </h2>
                </div>
                <div
                    className="position-relative mb-4"
                    style={{ maxWidth: 700 }}
                >
                    <button
                        className="position-absolute top-50 start-0 translate-middle-y btn btn-dark rounded-circle"
                        style={{ zIndex: 2, left: -32, opacity: 0.7 }}
                        onClick={goPrev}
                        aria-label="Previous event"
                    >
                        &#8249;
                    </button>
                    <img
                        src={events[current].img}
                        alt={events[current].title}
                        className="img-fluid rounded-4 shadow"
                        style={{
                            width: "800px",
                            height: "400px",
                            objectFit: "cover",
                            borderRadius: "20px",
                            minHeight: 320,
                            background: "#222",
                        }}
                    />
                    <button
                        className="position-absolute top-50 end-0 translate-middle-y btn btn-dark rounded-circle"
                        style={{ zIndex: 2, right: -32, opacity: 0.7 }}
                        onClick={goNext}
                        aria-label="Next event"
                    >
                        &#8250;
                    </button>
                    <span
                        className="position-absolute top-0 start-0 mt-2 ms-3 text-light"
                        style={{
                            fontSize: 16,
                            opacity: 0.7,
                            cursor: "pointer",
                        }}
                        onClick={() => window.history.back()}
                    ></span>
                </div>
                <div className="text-center">
                    <div
                        className="mb-2 fw-bold"
                        style={{ color: "#fff", fontSize: 18 }}
                    >
                        DATE:{" "}
                        <span style={{ color: "#bfc6e0" }}>
                            {events[current].date}
                        </span>
                    </div>
                    <div
                        className="mb-4"
                        style={{
                            color: "#bfc6e0",
                            fontStyle: "italic",
                            fontSize: 17,
                        }}
                    >
                        {events[current].description}
                    </div>
                    {/* Dots navigation */}
                    <div className="d-flex justify-content-center mt-2">
                        {events.map((_, idx) => (
                            <button
                                key={idx}
                                className="hero-dot"
                                style={{
                                    width: 24,
                                    height: 12,
                                    borderRadius: 8,
                                    margin: "0 6px",
                                    background:
                                        idx === current ? "#fff" : "#bbb",
                                    border: "none",
                                    outline: "none",
                                    transition: "background 0.3s",
                                }}
                                onClick={() => setCurrent(idx)}
                                aria-label={`Go to event ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
