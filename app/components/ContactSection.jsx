"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setStatusMessage("");

        // Validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            setShowWarning(true);
            return;
        }
        setShowWarning(false);
        setLoading(true);

        try {
            const res = await fetch("/.netlify/functions/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });


            const data = await res.json();

            if (res.ok) {
                setStatusMessage(data.message);
                setName("");
                setEmail("");
                setMessage("");
            } else {
                setStatusMessage(data.error || "Failed to send message.");
            }
        } catch (error) {
            console.error(error);

            setStatusMessage("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-page">
            <div className="contact-container">
                <div className="contact-form-card">
                    <h2>LET’S CONNECT</h2>

                    {/* Status message */}
                    {statusMessage && (
                        <p
                            className={`mt-2 text-sm font-semibold ${statusMessage.includes("Failed") ? "text-red-500" : "text-green-500"
                                }`}
                        >
                            {statusMessage}
                        </p>
                    )}

                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {showWarning && !name.trim() && (
                            <p className="mt-1 text-sm font-semibold text-red-500">Please fill in your name.</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {showWarning && !email.trim() && (
                            <p className="mt-1 text-sm font-semibold text-red-500">Please fill in your email.</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <textarea
                            placeholder="Why are you connecting?"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {showWarning && !message.trim() && (
                            <p className="mt-1 text-sm font-semibold text-red-500">
                                Please fill in why you are connecting.
                            </p>
                        )}
                    </div>

                    <motion.button
                        onClick={handleSendMessage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        className="
              flex items-center gap-2
              rounded-full
              border border-[#A9C4FF]/40
              bg-white/10 backdrop-blur-xl
              px-4 py-2
              text-[#C7D2FF]
              shadow-lg
              hover:bg-white/20
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
                    >
                        <Mail size={16} className="sm:size-[20px]" />
                        <span className="text-sm tracking-wide">{loading ? "Sending..." : "Send Message"}</span>
                    </motion.button>
                </div>

                <div className="contact-map-card">
                    <iframe
                        src="https://www.google.com/maps?q=Chennai&output=embed"
                        loading="lazy"
                    ></iframe>
                    <p>📍 Chennai, Tamil Nadu, India</p>
                </div>
            </div>
        </section>
    );
}
