'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '600px',
  position: 'relative'
};

const defaultCenter = {
  lat: 37.0902,
  lng: -95.7129
};

// Global promise to track script loading
let loadGoogleMapsPromise = null;

const loadGoogleMapsScript = () => {
  if (loadGoogleMapsPromise) {
    return loadGoogleMapsPromise;
  }

  loadGoogleMapsPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps script loaded');
      resolve(window.google.maps);
    };

    script.onerror = (err) => {
      console.error('Error loading Google Maps script:', err);
      reject(err);
    };

    document.head.appendChild(script);
  });

  return loadGoogleMapsPromise;
};

export default function SpeakingMap({ engagements }) {
  console.log('SpeakingMap rendering');
  console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing');

  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  useEffect(() => {
    let mounted = true;

    const initializeMap = async () => {
      try {
        const maps = await loadGoogleMapsScript();
        if (!mounted || !mapRef.current || mapInstanceRef.current) return;

        // Create map instance
        mapInstanceRef.current = new maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 3,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        });
        console.log('Map instance created successfully');

        // Clear existing markers and info windows
        markersRef.current.forEach(marker => marker.setMap(null));
        infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
        markersRef.current = [];
        infoWindowsRef.current = [];

        // Add markers for each engagement
        if (engagements && engagements.length > 0) {
          const geocoder = new maps.Geocoder();
          let bounds = new maps.LatLngBounds();

          for (const engagement of engagements) {
            if (!engagement.location) {
              console.log(`Skipping engagement without location: ${engagement.title}`);
              continue;
            }

            try {
              console.log(`Geocoding location for: ${engagement.title} at ${engagement.location}`);
              const result = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: engagement.location }, (results, status) => {
                  if (status === 'OK') {
                    resolve(results[0]);
                  } else {
                    console.error(`Geocoding status for ${engagement.location}: ${status}`);
                    reject(new Error(`Geocoding failed: ${status}`));
                  }
                });
              });

              const position = result.geometry.location;
              bounds.extend(position);

              // Create marker
              const marker = new maps.Marker({
                position,
                map: mapInstanceRef.current,
                title: engagement.title,
                animation: maps.Animation.DROP
              });

              // Create info window
              const infoWindow = new maps.InfoWindow({
                content: `
                  <div style="padding: 8px; max-width: 300px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1976d2;">${engagement.title}</h3>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Location:</strong> ${engagement.location}
                    </p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Date:</strong> ${new Date(engagement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    ${engagement.description ? `
                      <p style="margin: 8px 0 4px 0; font-size: 14px; color: #333;">
                        ${engagement.description}
                      </p>
                    ` : ''}
                    ${engagement.url ? `
                      <p style="margin: 8px 0 0 0;">
                        <a href="${engagement.url}" target="_blank" rel="noopener noreferrer" 
                           style="color: #1976d2; text-decoration: none; font-size: 14px;">
                          View Event Details →
                        </a>
                      </p>
                    ` : ''}
                  </div>
                `
              });

              // Add click listener
              marker.addListener('click', () => {
                infoWindowsRef.current.forEach(window => window.close());
                infoWindow.open(mapInstanceRef.current, marker);
              });

              markersRef.current.push(marker);
              infoWindowsRef.current.push(infoWindow);
              console.log(`Successfully added marker for: ${engagement.title}`);
            } catch (err) {
              console.error(`Error geocoding location for ${engagement.title}:`, err);
              // Add a marker at a default location with a different icon to indicate error
              const marker = new maps.Marker({
                position: defaultCenter,
                map: mapInstanceRef.current,
                title: `${engagement.title} (Location Error)`,
                icon: {
                  path: maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor: '#FF0000',
                  fillOpacity: 1,
                  strokeColor: '#FFFFFF',
                  strokeWeight: 2
                }
              });

              const infoWindow = new maps.InfoWindow({
                content: `
                  <div style="padding: 8px; max-width: 300px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1976d2;">${engagement.title}</h3>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Location:</strong> ${engagement.location}
                    </p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">
                      <strong>Date:</strong> ${new Date(engagement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    ${engagement.description ? `
                      <p style="margin: 8px 0 4px 0; font-size: 14px; color: #333;">
                        ${engagement.description}
                      </p>
                    ` : ''}
                    ${engagement.url ? `
                      <p style="margin: 8px 0 4px 0;">
                        <a href="${engagement.url}" target="_blank" rel="noopener noreferrer" 
                           style="color: #1976d2; text-decoration: none; font-size: 14px;">
                          View Event Details →
                        </a>
                      </p>
                    ` : ''}
                    <p style="margin: 8px 0 0 0; color: #d32f2f; font-size: 14px;">
                      ⚠️ Location could not be geocoded
                    </p>
                  </div>
                `
              });

              marker.addListener('click', () => {
                infoWindowsRef.current.forEach(window => window.close());
                infoWindow.open(mapInstanceRef.current, marker);
              });

              markersRef.current.push(marker);
              infoWindowsRef.current.push(infoWindow);
            }
          }

          // Fit map to show all markers
          if (markersRef.current.length > 0) {
            mapInstanceRef.current.fitBounds(bounds);
          }
        }
      } catch (err) {
        console.error('Error initializing map:', err);
        if (mounted) {
          setError(`Failed to initialize map: ${err.message}`);
        }
      }
    };

    initializeMap();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      markersRef.current.forEach(marker => marker.setMap(null));
      infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
    };
  }, [engagements]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <Paper sx={{ height: 600, p: 3 }}>
        <Typography>Google Maps API Key is missing</Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        height: 600,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box 
        ref={mapRef}
        sx={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          backgroundColor: '#f5f5f5'
        }}
      />
    </Paper>
  );
} 