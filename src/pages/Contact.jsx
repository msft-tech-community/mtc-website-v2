import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/features/Contact/ContactForm.jsx";
import Footer from "../components/ui/Footer/Footer.jsx";

export default function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <ContactForm />
            <Footer />
        </motion.div>
    );
}
