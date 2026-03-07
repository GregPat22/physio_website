"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type L from "leaflet";

const BOLOGNA_CENTER: [number, number] = [44.4949, 11.3426];
const RADIUS_KM = 2;
const RADIUS_M = RADIUS_KM * 1000;

const STUDIO_COORDS: [number, number] = [44.5012, 11.3476];

export default function BolognaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    (async () => {
      const leaflet = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      const map = leaflet.map(mapRef.current, {
        center: BOLOGNA_CENTER,
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
      });
      mapInstanceRef.current = map;

      leaflet.control.zoom({ position: "bottomright" }).addTo(map);

      leaflet.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution: "",
        },
      ).addTo(map);

      leaflet
        .circle(BOLOGNA_CENTER, {
          radius: RADIUS_M,
          color: "#2B3A54",
          weight: 2,
          opacity: 0.6,
          fillColor: "#3c5074",
          fillOpacity: 0.1,
          dashArray: "8 6",
        })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui;text-align:center;padding:4px 2px">
            <strong style="font-size:13px;color:#2B3A54">Area di Copertura</strong><br/>
            <span style="font-size:11px;color:#666">Raggio di ${RADIUS_KM} km da Bologna</span>
          </div>`,
        );

      const studioIcon = leaflet.divIcon({
        className: "",
        html: `<div style="
          width:36px;height:36px;
          background:#2B3A54;
          border:3px solid #fff;
          border-radius:50%;
          box-shadow:0 2px 8px rgba(43,58,84,0.35);
          display:flex;align-items:center;justify-content:center;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38],
      });

      leaflet
        .marker(STUDIO_COORDS, { icon: studioIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui;padding:6px 4px;min-width:160px">
            <strong style="font-size:14px;color:#2B3A54;display:block;margin-bottom:4px">Poliambulatorio MG</strong>
            <span style="font-size:12px;color:#555;line-height:1.4">Via Irnerio 53<br/>40126 Bologna (BO)</span>
          </div>`,
        )
        .openPopup();

      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={mapRef}
        className="h-[420px] w-full sm:h-[500px] md:h-[560px] lg:h-[620px]"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f4f3f0]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2B3A54]/20 border-t-[#2B3A54]" />
        </div>
      )}
    </div>
  );
}
