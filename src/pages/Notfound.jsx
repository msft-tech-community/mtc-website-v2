import { Link } from "react-router-dom";

export default function Notfound() {
    return (
        <section className="container mt-5">
            <div className="mtc-card text-center">
                <h1
                    className="display-1 fw-bold mb-3"
                    style={{ color: "#d32f2f" }}
                >
                    404
                </h1>
                <h2 className="mb-4 text-mtc-primary">Page Not Found</h2>
                <p className="lead mb-4">
                    Oops! The page you are looking for does not exist or has
                    been moved.
                </p>
                <Link
                    to="/"
                    className="btn btn-mtc btn-lg px-4 rounded-pill shadow"
                >
                    Go Home
                </Link>
            </div>
        </section>
    );
}
