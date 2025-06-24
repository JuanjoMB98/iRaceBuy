import React, { useEffect, useState } from "react";
import "./CookieConsentDialog.css";

const COOKIE_KEY = "cookie_consent";

export default function CookieConsentDialog() {
    const [open, setOpen] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_KEY);
        if (!consent) setOpen(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_KEY, "accepted");
        setOpen(false);
        loadAnalytics();
    };

    const handleReject = () => {
        localStorage.setItem(COOKIE_KEY, "rejected");
        setOpen(false);
    };

    const handleCustomize = () => {
        setShowCustomize(true);
    };

    // Carga Google Analytics solo si se acepta
    function loadAnalytics() {
        if (window.gtag) return;
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-C8V7DKH871"; // Reemplaza por tu ID
        script.async = true;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "G-C8V7DKH871"); // Reemplaza por tu ID
    }

    // Si ya aceptó, carga analytics
    useEffect(() => {
        if (localStorage.getItem(COOKIE_KEY) === "accepted") {
            loadAnalytics();
        }
    }, []);

    if (!open) return null;

    return (
        <div className="cookie-dialog__backdrop">
            <div className="cookie-dialog">
                <h3>🍪 Cookie consent</h3>
                <p>
                    I use cookies only to understand whether this website is
                    truly useful to the iRacing community.
                    <strong>
                        {" "}
                        Cookies help me track how many people visit the site,
                        which allows me to decide whether it's worth{" "}
                    </strong>
                    continuing to maintain and improve it. No personal data is
                    collected or stored beyond basic visit counts.
                </p>
                {showCustomize ? (
                    <div className="cookie-dialog__customize">
                        <label>
                            <input type="checkbox" checked disabled /> Necessary (always on)
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked /> Analytics
                        </label>
                        <button onClick={handleAccept}>
                            Save my preferences
                        </button>
                    </div>
                ) : (
                    <div className="cookie-dialog__actions">
                        <button onClick={handleAccept}>Accept All</button>
                        <button onClick={handleReject}>Reject All</button>
                        <button onClick={handleCustomize}>Customize</button>
                    </div>
                )}
                <a
                    href="/cookiePolicy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Cookie Policy
                </a>
            </div>
        </div>
    );
}
