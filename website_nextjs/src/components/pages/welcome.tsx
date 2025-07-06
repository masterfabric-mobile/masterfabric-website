'use client'

import React, { useState, useEffect } from 'react'
import { Smartphone, TabletIcon as TabletSmartphone, MonitorIcon as Monitor } from 'lucide-react'

export default function Welcome() {
  const [currentScenario, setCurrentScenario] = useState('firebase')

  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-10 pb-8 md:pt-8 md:pb-12">
      {/* Content Section */}
      <div className="md:order-1">
        <h2 className="text-xl lg:text-3xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter">
          Custom Mobile App Development 
        </h2>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          Take your business to the next level in the mobile world! Reach your customers anytime, 
          anywhere with custom, user-friendly, and innovative mobile apps tailored to your needs.
        </p>
        <div className="mt-4">
          <div className="flex gap-8 md:gap-20 items-center mt-10 flex-wrap justify-start">
            <Smartphone className="size-8 md:size-12 hover:text-blue-700 transition-colors cursor-pointer" />
            <TabletSmartphone className="size-8 md:size-12 hover:text-blue-700 transition-colors cursor-pointer" />
            <Monitor className="size-8 md:size-12 hover:text-blue-700 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Animated Code Editor */}
      <div className="py-6 md:order-2 md:block w-full max-w-2xl">
        <div className="code-editor-container">
          {/* Editor Header */}
          <div className="editor-header">
            <div className="editor-controls">
              <div className="control-dot red"></div>
              <div className="control-dot yellow"></div>
              <div className="control-dot green"></div>
            </div>
            <div className="editor-title">auth_service.dart</div>
            <div className="editor-actions">
              <div className="action-buttons">
                <button 
                  className="action-btn"
                  onClick={() => setCurrentScenario('firebase')}
                  title="Firebase Authentication"
                >
                  🔥
                </button>
                <button 
                  className="action-btn"
                  onClick={() => setCurrentScenario('devops')}
                  title="DevOps Pipeline"
                >
                  🚀
                </button>
                <button 
                  className="action-btn"
                  onClick={() => setCurrentScenario('splash')}
                  title="Splash Screen"
                >
                  📱
                </button>
              </div>
            </div>
          </div>
          
          {/* Code Area */}
          <div className="flex">
            <div className="line-numbers">
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i + 1}>{i + 1}</div>
              ))}
            </div>
            
            <div className="code-content">
              <div className="code-line">
                <span className="keyword">import</span> <span className="string">&apos;package:firebase_auth/firebase_auth.dart&apos;</span>;
              </div>
              <div className="code-line">
                <span className="keyword">import</span> <span className="string">&apos;package:cloud_firestore/cloud_firestore.dart&apos;</span>;
              </div>
              <div className="code-line"></div>
              <div className="code-line">
                <span className="keyword">class</span> <span className="class">AuthService</span> {'{'}
              </div>
              <div className="code-line">
                <span className="indent">  </span><span className="keyword">final</span> <span className="class">FirebaseAuth</span> <span className="variable">_auth</span> = <span className="class">FirebaseAuth</span>.<span className="variable">instance</span>;
              </div>
              <div className="code-line">
                <span className="indent">  </span><span className="keyword">final</span> <span className="class">FirebaseFirestore</span> <span className="variable">_firestore</span> = <span className="class">FirebaseFirestore</span>.<span className="variable">instance</span>;
              </div>
              <div className="code-line"></div>
              <div className="code-line">
                <span className="indent">  </span><span className="keyword">Future</span>&lt;<span className="class">User</span>?&gt; <span className="function">signInWithEmail</span>(<span className="keyword">String</span> <span className="variable">email</span>, <span className="keyword">String</span> <span className="variable">password</span>) <span className="keyword">async</span> {'{'}
              </div>
              <div className="code-line">
                <span className="indent">    </span><span className="keyword">try</span> {'{'}
              </div>
              <div className="code-line">
                <span className="indent">      </span><span className="keyword">final</span> <span className="variable">credential</span> = <span className="keyword">await</span> <span className="variable">_auth</span>.<span className="function">signInWithEmailAndPassword</span>(
              </div>
              <div className="code-line">
                <span className="indent">        </span><span className="variable">email</span>: <span className="variable">email</span>,
              </div>
              <div className="code-line">
                <span className="indent">        </span><span className="variable">password</span>: <span className="variable">password</span>,
              </div>
              <div className="code-line">
                <span className="indent">      </span>);
              </div>
              <div className="code-line">
                <span className="indent">      </span><span className="keyword">return</span> <span className="variable">credential</span>.<span className="variable">user</span>;
              </div>
              <div className="code-line">
                <span className="indent">    </span>{'}'} <span className="keyword">catch</span> (<span className="variable">e</span>) {'{'}
              </div>
              <div className="code-line">{'}'}</div>
            </div>
          </div>
          
          {/* Console */}
          <div className="editor-console">
            <div className="console-header">Console Output</div>
            <div className="console-content">
              <div className="console-message text-green-400">
                🔧 Initializing Firebase services...
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
