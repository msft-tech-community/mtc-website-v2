import { useEffect } from "react";
import "./EventRedirect.css";

const EventRedirect = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href =
                "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MzM3YmNjNDYtMGRiNS00N2ZmLTlmNjEtYTI1ZjM1Y2FkNWJk%40thread.v2/0?context=%7b%22Tid%22%3a%2284c31ca0-ac3b-4eae-ad11-519d80233e6f%22%2c%22Oid%22%3a%22659cf958-f62b-452f-ab3c-1f60312713b0%22%7d";
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>🎉 Welcome to the Event!</h1>
            <p style={styles.subtext}>
                Redirecting you to the MS Teams meeting...
            </p>
            <div className="spinner"></div> {/* Uses the animation */}
            <p style={styles.note}>
                If you're not redirected,{" "}
                <a
                    href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_MzM3YmNjNDYtMGRiNS00N2ZmLTlmNjEtYTI1ZjM1Y2FkNWJk%40thread.v2/0?context=%7b%22Tid%22%3a%2284c31ca0-ac3b-4eae-ad11-519d80233e6f%22%2c%22Oid%22%3a%22659cf958-f62b-452f-ab3c-1f60312713b0%22%7d"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    click here
                </a>
                .
            </p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "15vh",
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#3B82F6",
        marginBottom: "1rem",
    },
    subtext: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "2rem",
    },
    note: {
        fontSize: "1rem",
        color: "#333",
    },
};

export default EventRedirect;
