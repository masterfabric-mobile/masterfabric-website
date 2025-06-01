'use client';

import React, { useState, useEffect } from 'react';
import { X, Settings, Cookie } from 'lucide-react';
import { 
  shouldShowCookieBanner, 
  acceptAllCookies, 
  acceptEssentialOnly,
  markBannerAsShown 
} from '@/utils/cookies';
import CookieSettingsDialog from './CookieSettingsDialog';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if banner should be shown after component mounts
    const shouldShow = shouldShowCookieBanner();
    setIsVisible(shouldShow);
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    acceptEssentialOnly();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    markBannerAsShown();
    setIsVisible(false);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    setShowSettings(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Icon and Text */}
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  We use cookies on this site
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies on our website to provide you with the best experience. 
                  By continuing to use our site, you agree to the use of cookies.
                  <button 
                    onClick={handleOpenSettings}
                    className="text-blue-600 hover:text-blue-700 underline ml-1"
                  >
                    Customize your cookie preferences
                  </button>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Essential Only
              </button>
              <button
                onClick={handleOpenSettings}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                Accept All
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 lg:relative lg:top-0 lg:right-0 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <CookieSettingsDialog
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
      />
    </>
  );
}
