'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Globe from '@/components/about/Globe'
import aboutData from '@/data/about.json'
import '../../styles/brutalist.css'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Brutalist Hero Section */}
      <div className="brutalist-container">
        <motion.div 
          className="brutalist-grid"
          style={{ y: y1 }}
        ></motion.div>
        
        {/* Floating Shapes */}
        <motion.div 
          className="floating-shapes"
          style={{ y: y2 }}
        >
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </motion.div>
        
        <motion.div 
          className="brutalist-hero"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y: y1 }}
        >
          <h1 className="brutalist-title">
            MASTER
            <br />
            FABRIC
          </h1>
          <div className="brutalist-subtitle">
            {/* CODE • DESIGN • INNOVATE */}
            CODE • DESIGN • INNOVATE
          </div>
        </motion.div>
      </div>

      {/* Neural Network Section */}
      <Globe activities={aboutData.activities} />

      {/* Vision Section */}
      <motion.div 
        className="brutalist-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="brutalist-section-title">OUR VISION</h2>
        <p className="text-lg font-bold mb-6 text-black">
          WE CREATE DIGITAL EXPERIENCES THAT BREAK BOUNDARIES AND CHALLENGE CONVENTIONS.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="brutalist-card">
            <h3 className="brutalist-card-title">INNOVATION</h3>
            <p>Pushing the limits of technology to create unprecedented digital solutions.</p>
          </div>
          <div className="brutalist-card">
            <h3 className="brutalist-card-title">DESIGN</h3>
            <p>Crafting bold, memorable experiences that captivate and engage users.</p>
          </div>
          <div className="brutalist-card">
            <h3 className="brutalist-card-title">EXECUTION</h3>
            <p>Delivering pixel-perfect implementations with uncompromising quality.</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="brutalist-section"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="brutalist-section-title">BY THE NUMBERS</h2>
        <div className="brutalist-stats">
          <motion.div 
            className="brutalist-stat"
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="brutalist-stat-number">500+</span>
            <span className="brutalist-stat-label">PROJECTS</span>
          </motion.div>
          <motion.div 
            className="brutalist-stat"
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="brutalist-stat-number">50+</span>
            <span className="brutalist-stat-label">CLIENTS</span>
          </motion.div>
          <motion.div 
            className="brutalist-stat"
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="brutalist-stat-number">24/7</span>
            <span className="brutalist-stat-label">SUPPORT</span>
          </motion.div>
          <motion.div 
            className="brutalist-stat"
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="brutalist-stat-number">99%</span>
            <span className="brutalist-stat-label">SUCCESS</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div 
        className="brutalist-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="brutalist-section-title">OUR JOURNEY</h2>
        <div className="brutalist-timeline">
          <motion.div 
            className="brutalist-timeline-item"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="brutalist-card">
              <h3 className="brutalist-card-title">2020</h3>
              <p>Founded with a vision to revolutionize digital experiences through cutting-edge technology.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="brutalist-timeline-item"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="brutalist-card">
              <h3 className="brutalist-card-title">2021</h3>
              <p>Expanded our team and launched groundbreaking mobile applications that redefined user interaction.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="brutalist-timeline-item"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="brutalist-card">
              <h3 className="brutalist-card-title">2022</h3>
              <p>Pioneered AI-driven solutions and established partnerships with leading technology companies.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="brutalist-timeline-item"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="brutalist-card">
              <h3 className="brutalist-card-title">2024</h3>
              <p>Leading the industry with innovative blockchain solutions and next-generation user experiences.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Technologies Section */}
      <motion.div 
        className="brutalist-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="brutalist-section-title">TECH ARSENAL</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'REACT', color: '#61DAFB' },
            { name: 'NEXT.JS', color: '#000000' },
            { name: 'TYPESCRIPT', color: '#3178C6' },
            { name: 'NODE.JS', color: '#339933' },
            { name: 'PYTHON', color: '#3776AB' },
            { name: 'AWS', color: '#FF9900' },
            { name: 'BLOCKCHAIN', color: '#F7931A' },
            { name: 'AI/ML', color: '#FF6B6B' }
          ].map((tech, index) => (
            <motion.div 
              key={tech.name}
              className="brutalist-card brutalist-interactive-element"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                skew: 0,
                boxShadow: `12px 12px 0 ${tech.color}`,
                backgroundColor: tech.color,
                color: tech.color === '#000000' ? '#fff' : '#000'
              }}
              viewport={{ once: true }}
            >
              <h3 className="brutalist-card-title">{tech.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="brutalist-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="brutalist-title" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
          READY TO
          <br />
          COLLABORATE?
        </h2>
        <p className="text-xl mb-12 text-white font-bold">
          LET&apos;S CREATE SOMETHING EXTRAORDINARY TOGETHER
        </p>
        <motion.button 
          className="brutalist-button"
          whileHover={{ scale: 1.1, skew: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          START PROJECT
        </motion.button>
        
        {/* Terminal Simulation */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-black border-4 border-green-400 rounded-lg overflow-hidden">
            <div className="bg-green-400 text-black px-4 py-2 font-bold">
              MASTERFABRIC TERMINAL v2.0
            </div>
            <div className="p-4 text-green-400 font-mono text-sm">
              <div className="mb-2">$ git clone https://github.com/masterfabric/innovation.git</div>
              <div className="mb-2">$ cd innovation</div>
              <div className="mb-2">$ npm install --save creativity</div>
              <div className="mb-2">$ npm start</div>
              <div className="text-white mb-2">&gt; Starting development server...</div>
              <div className="text-white mb-2">&gt; Loading modules: [████████████] 100%</div>
              <div className="text-green-400 mb-2">&gt; Server ready on http://localhost:3000</div>
              <div className="text-green-400">&gt; Ready to build the future? <span className="animate-pulse">_</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
