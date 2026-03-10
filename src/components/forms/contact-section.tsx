'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import ContactBenefits from './contact/ContactBenefits'
import ContactSectionText from './contact/ContactSectionText'
import ContactAiFirstPanel from './contact/ContactAiFirstPanel'
import ContactForm from './contact/ContactForm'

export default function ContactSection() {
  const [formExpanded, setFormExpanded] = useState(false)

  useEffect(() => {
    const openForm = () => setFormExpanded(true)
    window.addEventListener('openContactModal', openForm)
    return () => window.removeEventListener('openContactModal', openForm)
  }, [])

  return (
    <section className="py-14 lg:py-20 relative bg-white">
      <div className="mx-auto max-w-8xl px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_minmax(320px,400px)] gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="flex flex-col min-w-0">
            <div className="space-y-6 lg:space-y-7">
              <ContactSectionText showBadge={false} />
              <div>
                <p className="text-xs font-medium text-gray-500 tracking-wide mb-3">
                  Why work with us
                </p>
                <ContactBenefits />
              </div>
            </div>
          </div>

          {/* Sağ kolon: ya panel ya form – ikisi alt alta değil, biri diğerinin yerine */}
          <div className="flex flex-col lg:sticky lg:top-24 w-full">
            {formExpanded ? (
              <div className="w-full flex flex-col">
                <button
                  type="button"
                  onClick={() => setFormExpanded(false)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-3"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden />
                  Back
                </button>
                <ContactForm initialOpen onSubmit={() => setFormExpanded(false)} />
              </div>
            ) : (
              <ContactAiFirstPanel />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
