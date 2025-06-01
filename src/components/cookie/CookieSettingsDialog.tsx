'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, BarChart3, Target, Info } from 'lucide-react';
import { getCookieConsent, saveCookieConsent, markBannerAsShown } from '@/utils/cookies';

interface CookieSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function CookieSettingsDialog({ isOpen, onClose, onSave }: CookieSettingsDialogProps) {
  const [settings, setSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    if (isOpen) {
      const consent = getCookieConsent();
      if (consent) {
        setSettings({
          essential: consent.essential,
          analytics: consent.analytics,
          marketing: consent.marketing
        });
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    saveCookieConsent({
      analytics: settings.analytics,
      marketing: settings.marketing
    });
    markBannerAsShown();
    onSave();
  };

  const handleAcceptAll = () => {
    setSettings({
      essential: true,
      analytics: true,
      marketing: true
    });
    saveCookieConsent({
      analytics: true,
      marketing: true
    });
    markBannerAsShown();
    onSave();
  };

  const handleRejectAll = () => {
    setSettings({
      essential: true,
      analytics: false,
      marketing: false
    });
    saveCookieConsent({
      analytics: false,
      marketing: false
    });
    markBannerAsShown();
    onSave();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900" id="modal-title">
              Çerez Ayarları
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You can manage your cookie preferences below. Some cookies are necessary for our site to function properly.
            </p>

            {/* Essential Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Essential Cookies</h4>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Always active</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                These cookies are necessary for the basic functions of the website and cannot be turned off.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Used to analyze site usage and make improvements.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.marketing}
                    onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Used to show you personalized ads and measure marketing effectiveness.
              </p>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                You can change your cookie settings at any time. For more information, please review our 
                <a href="/privacy" className="underline ml-1">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <button
              onClick={handleRejectAll}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Reject All
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
