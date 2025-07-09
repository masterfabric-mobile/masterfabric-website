"use client";
import React, { useEffect, useRef, useState } from "react";
import '../../styles/cookie-banner.css';
import {
  shouldShowCookieBanner,
  acceptAllCookies,
  acceptEssentialOnly,
  saveCookieConsent,
  getCookieConsent,
  markBannerAsShown
} from "../../utils/cookies";

const COOKIE_POLICY = {
  types: {
    essential: {
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off."
    },
    analytics: {
      name: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website."
    },
    marketing: {
      name: "Marketing Cookies",
      description: "These cookies are used to track visitors across websites."
    }
  }
};

type CookieSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

function CookieSettingsModal({ isOpen, onClose, onSave }: CookieSettingsModalProps) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const consent = getCookieConsent();
      setAnalytics(consent?.analytics || false);
      setMarketing(consent?.marketing || false);
      setTimeout(() => {
        if (modalRef.current) {
          const btn = modalRef.current.querySelector<HTMLElement>("button, input, textarea, select, a[href]");
          if (btn) btn.focus();
        }
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveCookieConsent({ analytics, marketing });
    markBannerAsShown();
    onSave();
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveCookieConsent({ analytics: true, marketing: true });
    markBannerAsShown();
    onSave();
  };

  return (
    <div className={`cookie-modal${isOpen ? ' show' : ''}`} ref={modalRef} tabIndex={-1}>
      <div className="cookie-modal-backdrop" onClick={onClose}></div>
      <div className="cookie-modal-content">
        <div className="cookie-modal-header">
          <h3>Cookie Settings</h3>
          <button className="cookie-close-btn" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="cookie-modal-body">
          <p className="cookie-modal-description">
            Choose which cookies you want to allow. You can change these settings at any time.
          </p>
          <div className="cookie-categories">
            {/* Essential */}
            <div className="cookie-category">
              <div className="cookie-category-header">
                <div className="cookie-category-info">
                  <h4>{COOKIE_POLICY.types.essential.name}</h4>
                  <p>{COOKIE_POLICY.types.essential.description}</p>
                </div>
                <div className="cookie-toggle">
                  <input type="checkbox" id="essential-toggle" checked disabled className="cookie-checkbox" />
                  <label htmlFor="essential-toggle" className="cookie-toggle-label always-active">Always Active</label>
                </div>
              </div>
            </div>
            {/* Analytics */}
            <div className="cookie-category">
              <div className="cookie-category-header">
                <div className="cookie-category-info">
                  <h4>{COOKIE_POLICY.types.analytics.name}</h4>
                  <p>{COOKIE_POLICY.types.analytics.description}</p>
                </div>
                <div className="cookie-toggle">
                  <input type="checkbox" id="analytics-toggle" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="cookie-checkbox" />
                  <label htmlFor="analytics-toggle" className="cookie-toggle-label"></label>
                </div>
              </div>
            </div>
            {/* Marketing */}
            <div className="cookie-category">
              <div className="cookie-category-header">
                <div className="cookie-category-info">
                  <h4>{COOKIE_POLICY.types.marketing.name}</h4>
                  <p>{COOKIE_POLICY.types.marketing.description}</p>
                </div>
                <div className="cookie-toggle">
                  <input type="checkbox" id="marketing-toggle" checked={marketing} onChange={e => setMarketing(e.target.checked)} className="cookie-checkbox" />
                  <label htmlFor="marketing-toggle" className="cookie-toggle-label"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cookie-modal-footer">
          <button className="cookie-btn cookie-btn-primary" onClick={handleSave} id="save-settings">Save Settings</button>
          <button className="cookie-btn cookie-btn-outline" onClick={handleAcceptAll} id="accept-all-modal">Accept All</button>
        </div>
      </div>
    </div>
  );
}

export default function CookieBanner() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [persistentIcon, setPersistentIcon] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  // Show/hide logic
  useEffect(() => {
    if (shouldShowCookieBanner()) {
      setTimeout(() => setBannerVisible(true), 100);
    } else {
      setTimeout(() => setPersistentIcon(true), 500);
    }
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) setModalOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  // Banner show/hide animation
  const showBanner = () => {
    setBannerVisible(true);
    setPersistentIcon(false);
  };
  const hideBanner = () => {
    setBannerVisible(false);
    setTimeout(() => setPersistentIcon(true), 400);
  };

  // Persistent icon click
  const handleIconClick = () => {
    showBanner();
  };

  // Banner actions
  const handleAcceptAll = () => {
    acceptAllCookies();
    hideBanner();
  };
  const handleEssential = () => {
    acceptEssentialOnly();
    hideBanner();
  };
  const handleSettings = () => {
    setModalOpen(true);
  };
  const handleCloseBanner = () => {
    markBannerAsShown();
    hideBanner();
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalSave = () => {
    setModalOpen(false);
    hideBanner();
  };

  return (
    <>
      {/* Persistent Cookie Icon */}
      <div
        ref={iconRef}
        className={`persistent-cookie-icon${persistentIcon ? ' show' : ''}`}
        style={{ pointerEvents: persistentIcon ? "auto" : "none" }}
      >
        <button
          className="persistent-cookie-button"
          aria-label="Cookie Settings"
          title="Cookie Settings"
          onClick={handleIconClick}
        >
          <span role="img" aria-label="cookie">🍪</span>
        </button>
        <div className="cookie-tooltip">Cookie Settings</div>
      </div>

      {/* Main Cookie Banner */}
      <div
        ref={bannerRef}
        className={`cookie-banner${bannerVisible ? ' show' : ''}`}
        style={{ pointerEvents: bannerVisible ? "auto" : "none" }}
      >
        <div className="cookie-banner-content">
          {/* Close button */}
          <button
            className="cookie-close-btn"
            aria-label="Close cookie banner"
            title="Close"
            onClick={handleCloseBanner}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          {/* Cookie icon and main content */}
          <div className="cookie-main-content">
            <div className="cookie-icon">🍪</div>
            <div className="cookie-text">
              <h3 className="cookie-title">We Use Cookies</h3>
              <p className="cookie-description">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies.
                <a href="/privacy-policy" className="cookie-link">Learn more</a>
              </p>
            </div>
          </div>
          {/* Action buttons */}
          <div className="cookie-actions">
            <button onClick={handleEssential} className="cookie-btn cookie-btn-outline" id="accept-essential">
              Essential Only
            </button>
            <button onClick={handleSettings} className="cookie-btn cookie-btn-outline" id="cookie-settings">
              Settings
            </button>
            <button onClick={handleAcceptAll} className="cookie-btn cookie-btn-primary" id="accept-all">
              Accept All
            </button>
          </div>
        </div>
      </div>
      {/* Cookie Settings Modal */}
      <CookieSettingsModal isOpen={modalOpen} onClose={handleModalClose} onSave={handleModalSave} />
    </>
  );
}
