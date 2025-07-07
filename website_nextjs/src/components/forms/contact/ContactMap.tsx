'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Focus, Navigation } from 'lucide-react'
import type { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// This component uses Leaflet for maps which requires client-side rendering
export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const retryCountRef = useRef(0)
  const cssLoadedRef = useRef(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = async () => {
      if (!mapRef.current || mapLoaded) return;

      try {
        // Define the office location coordinates
        const officeLocation: [number, number] = [41.03245, 28.97748]; // Istanbul coordinates
        
        // Add Leaflet CSS if not already added
        if (!document.querySelector('link[href*="leaflet.css"]') && !cssLoadedRef.current) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.onload = () => {
            cssLoadedRef.current = true;
          };
          document.head.appendChild(link);
          
          // Wait for CSS to load
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // Dynamic import of Leaflet
        const L = await import('leaflet');
        
        // Add fix for leaflet marker icons in production
        const fixLeafletIcons = () => {
          // Fix missing marker icon issue
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        };
        
        fixLeafletIcons();
        
        // Check if a map is already initialized on this element
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }
        
        // Initialize the map with explicit container size
        const mapContainer = mapRef.current;
        mapContainer.style.width = '100%';
        mapContainer.style.height = '100%';
        
        // Create map instance with explicit container
        const map = L.map(mapContainer, {
          center: officeLocation,
          zoom: 15,
          zoomControl: true
        });
        
        mapInstanceRef.current = map;
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);
        
        // Add a marker for the office location with custom icon
        const marker = L.marker(officeLocation).addTo(map);
        marker.bindPopup("<strong>MasterFabric Inc.</strong><br>Şehit Muhtar Mahallesi<br>Mis Sokak. No. 24/28<br>Beyoğlu / İstanbul").openPopup();
        
        // Add reset view button functionality
        const resetMapView = () => {
          map.setView(officeLocation, 15);
        };
        
        // Add navigation functionality for mobile
        const navigateToLocation = () => {
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${officeLocation[0]},${officeLocation[1]}`, '_blank');
        };
        
        // Expose functions to window so buttons can access them
        window.resetMapView = resetMapView;
        window.navigateToLocation = navigateToLocation;
        
        // Force a reflow to ensure map is properly sized
        map.invalidateSize();
        
        // Set a slight delay to ensure proper rendering
        setTimeout(() => {
          map.invalidateSize();
        }, 300);
        
        setMapLoaded(true);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError(true);
        
        // Retry up to 3 times if map fails to load
        if (retryCountRef.current < 3) {
          retryCountRef.current += 1;
          console.log(`Retrying map initialization (attempt ${retryCountRef.current})...`);
          setTimeout(() => {
            setMapError(false);
            setMapLoaded(false);
          }, 1500);
        }
      }
    };

    // Check if window is available (client-side) and initialize map
    if (typeof window !== 'undefined' && !mapLoaded && !mapError) {
      // Small delay before initialization to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeMap().catch(err => {
          console.error('Map initialization failed:', err);
          setMapError(true);
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      if (typeof window !== 'undefined') {
        // @ts-ignore - TypeScript doesn't know about our custom properties
        delete window.resetMapView;
        // @ts-ignore - TypeScript doesn't know about our custom properties
        delete window.navigateToLocation;
      }
    };
  }, [mapLoaded, mapError]);

  return (
    <div className="pt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Us on the Map</h3>
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-64 lg:h-80">
        {/* Map container */}
        <div ref={mapRef} className="w-full h-full" id="map"></div>
        
        {/* Loading state overlay */}
        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-3"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Error state overlay */}
        {mapError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center p-6 text-center">
              <div className="text-red-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-gray-800 font-medium mb-3">Unable to load the map</p>
              <p className="text-gray-600 mb-4">Please check your internet connection</p>
              <button 
                onClick={() => { setMapError(false); setMapLoaded(false); }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 opacity-90">
          <button 
            onClick={() => typeof window !== 'undefined' && window.resetMapView?.()} 
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200" 
            title="Reset Map View"
            disabled={!mapLoaded}
          >
            <Focus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Button */}
      {isMobile && (
        <div className="mt-4">
          <button 
            onClick={() => typeof window !== 'undefined' && window.navigateToLocation?.()} 
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition-all hover:bg-blue-700 disabled:opacity-50"
            disabled={!mapLoaded}
          >
            <Navigation className="w-5 h-5" />
            <span>Navigate to Our Office</span>
          </button>
        </div>
      )}
    </div>
  )
}

// Add necessary type augmentations for window
declare global {
  interface Window {
    resetMapView?: () => void;
    navigateToLocation?: () => void;
  }
}
