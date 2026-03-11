'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Activity {
  flag: string;
  country: string;
  city: string;
  category: string;
}

interface GlobeProps {
  activities: Activity[];
}

const NeuralNetwork: React.FC<GlobeProps> = ({ activities }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeConnections, setActiveConnections] = useState<Array<{id: number, progress: number, activity: Activity}>>([]);
  const [nodes] = useState(() => {
    // Generate random node positions
    const nodeCount = 15;
    return Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 800 + 100,
      y: Math.random() * 400 + 100,
      radius: Math.random() * 3 + 2,
      activity: activities[Math.floor(Math.random() * activities.length)]
    }));
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw static connections
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) + 
            Math.pow(nodes[i].y - nodes[j].y, 2)
          );
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw active connections
      activeConnections.forEach(connection => {
        const startNode = nodes[connection.id];
        const endNode = nodes[(connection.id + 1) % nodes.length];
        
        const x = startNode.x + (endNode.x - startNode.x) * connection.progress;
        const y = startNode.y + (endNode.y - startNode.y) * connection.progress;
        
        // Glowing line
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(startNode.x, startNode.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Moving pulse
        ctx.fillStyle = '#00ff88';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = '#0066cc';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#00ccff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(drawNetwork);
    };

    drawNetwork();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [nodes, activeConnections]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      const nodeId = Math.floor(Math.random() * nodes.length);
      
      setActiveConnections(prev => [
        ...prev.filter(conn => conn.progress < 1),
        { id: nodeId, progress: 0, activity: randomActivity }
      ]);
    }, 1500);

    const progressInterval = setInterval(() => {
      setActiveConnections(prev => 
        prev.map(conn => ({
          ...conn,
          progress: Math.min(conn.progress + 0.02, 1)
        })).filter(conn => conn.progress < 1)
      );
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [activities, nodes]);

  return (
    <div className="relative my-16 overflow-hidden">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-4">
          GLOBAL NETWORK
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our neural connection matrix spans across continents, processing millions of data points in real-time
        </p>
      </motion.div>

      {/* Neural Network Canvas */}
      <div className="relative bg-gradient-to-b from-slate-900 to-black rounded-3xl p-8 border border-cyan-500/20">
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          className="w-full h-auto max-h-[600px] rounded-xl"
        />
        
        {/* Overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none" />
        
        {/* Activity Feed */}
        <div className="absolute top-8 right-8 w-80 max-md:hidden">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-6">
            <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              LIVE CONNECTIONS
            </h3>
            <div className="space-y-3">
              {activeConnections.slice(-4).map((connection, index) => (
                <motion.div
                  key={`${connection.id}-${index}`}
                  className="flex items-center space-x-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl">{connection.activity.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-cyan-400">{connection.activity.country}</div>
                    <div className="text-sm text-white font-medium">{connection.activity.category}</div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-8 left-8 max-md:hidden">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-400">15+</div>
                <div className="text-xs text-gray-400">NODES</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-400">{activeConnections.length}</div>
                <div className="text-xs text-gray-400">ACTIVE</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">24/7</div>
                <div className="text-xs text-gray-400">UPTIME</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400">∞</div>
                <div className="text-xs text-gray-400">SCALE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Grid */}
      <motion.div 
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
        {[
          { icon: '🌐', title: 'GLOBAL CDN', desc: 'Edge computing network across continents' },
          { icon: '⚡', title: 'QUANTUM SPEED', desc: 'Instant deployment and processing' },
          { icon: '🔒', title: 'ZERO TRUST', desc: 'Military-grade security protocols' },
          { icon: '🤖', title: 'AI POWERED', desc: 'Smart optimization and learning' }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NeuralNetwork;
