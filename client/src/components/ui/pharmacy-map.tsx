import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from './card';
import { Button } from './button';
import { AvailabilityBadge, VerificationBadge } from './badges';
import { Building2, MapPin, Phone, Clock, ArrowRight, Truck, BookmarkCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PharmacyMarkerData {
  id: string;
  name: string;
  licenseNumber: string;
  address: string;
  city: string;
  distance: string;
  phone: string;
  verificationStatus: 'VERIFIED' | 'PENDING';
  availability: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
  lat: number;
  lng: number;
  medicinesList?: string[];
}

export interface PharmacyMapProps {
  pharmacies?: PharmacyMarkerData[];
  selectedPharmacyId?: string;
  onSelectPharmacy?: (pharmacy: PharmacyMarkerData) => void;
  height?: string;
}

const defaultPharmacies: PharmacyMarkerData[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Apollo Community Pharmacy',
    licenseNumber: 'PH-LIC-2026-001',
    address: '104 Healthcare Boulevard',
    city: 'Chennai',
    distance: '0.8 km',
    phone: '+1-800-555-0200',
    verificationStatus: 'VERIFIED',
    availability: 'AVAILABLE',
    lat: 13.0827,
    lng: 80.2707,
    medicinesList: ['Paracetamol 500mg', 'Amoxicillin 500mg', 'Cetirizine 10mg'],
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    name: 'MedPlus Wellness Pharmacy',
    licenseNumber: 'PH-LIC-2026-002',
    address: '55 Park Street, Sector 4',
    city: 'Chennai',
    distance: '2.4 km',
    phone: '+1-800-555-0201',
    verificationStatus: 'VERIFIED',
    availability: 'LIMITED',
    lat: 13.0674,
    lng: 80.2376,
    medicinesList: ['Metformin 850mg', 'Atorvastatin 20mg'],
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    name: 'CareFirst Express Pharmacy',
    licenseNumber: 'PH-LIC-2026-003',
    address: '88 Metro Station Plaza',
    city: 'Chennai',
    distance: '3.1 km',
    phone: '+1-800-555-0202',
    verificationStatus: 'VERIFIED',
    availability: 'AVAILABLE',
    lat: 13.0405,
    lng: 80.25,
    medicinesList: ['Paracetamol 500mg', 'Ibuprofen 400mg'],
  },
];

export const PharmacyMap: React.FC<PharmacyMapProps> = ({
  pharmacies = defaultPharmacies,
  selectedPharmacyId,
  onSelectPharmacy,
  height = '480px',
}) => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activePharmacy, setActivePharmacy] = useState<PharmacyMarkerData | null>(
    pharmacies.find((p) => p.id === selectedPharmacyId) || pharmacies[0]
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [13.072, 80.255],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Custom marker icon helper
    const createCustomIcon = (status: string, isSelected: boolean) => {
      const color = status === 'AVAILABLE' ? '#006A61' : status === 'LIMITED' ? '#B45309' : '#C026D3';
      const size = isSelected ? 36 : 28;
      const html = `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
        ">
          🏥
        </div>
      `;
      return L.divIcon({
        html,
        className: 'custom-pharmacy-pin',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    };

    // Render pharmacy markers
    pharmacies.forEach((pharmacy) => {
      const isSelected = activePharmacy?.id === pharmacy.id;
      const icon = createCustomIcon(pharmacy.availability, isSelected);

      const marker = L.marker([pharmacy.lat, pharmacy.lng], { icon }).addTo(map);

      marker.on('click', () => {
        setActivePharmacy(pharmacy);
        if (onSelectPharmacy) onSelectPharmacy(pharmacy);
        map.panTo([pharmacy.lat, pharmacy.lng]);
      });
    });

    return () => {
      // Clean up map instance on unmount
    };
  }, [pharmacies, activePharmacy]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Leaflet Map Canvas */}
        <div
          ref={mapContainerRef}
          style={{ height }}
          className="lg:col-span-8 rounded-2xl border border-medilink-border shadow-xs overflow-hidden z-0"
        />

        {/* Selected Pharmacy Details Side Panel */}
        {activePharmacy && (
          <Card className="lg:col-span-4 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-medilink-navy font-heading">{activePharmacy.name}</h3>
                  <p className="text-xs text-medilink-muted font-mono">Lic: {activePharmacy.licenseNumber}</p>
                </div>
                <VerificationBadge status={activePharmacy.verificationStatus} />
              </div>

              <div className="p-3 bg-medilink-surface rounded-xl border border-medilink-border text-xs space-y-2">
                <div className="flex items-start gap-2 text-medilink-navy">
                  <MapPin className="w-4 h-4 text-medilink-teal flex-shrink-0 mt-0.5" />
                  <span>{activePharmacy.address}, {activePharmacy.city} ({activePharmacy.distance} away)</span>
                </div>
                <div className="flex items-center gap-2 text-medilink-navy">
                  <Phone className="w-4 h-4 text-medilink-teal flex-shrink-0" />
                  <span>{activePharmacy.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-medilink-muted font-semibold">Qualitative Inventory:</span>
                <AvailabilityBadge status={activePharmacy.availability} />
              </div>

              {activePharmacy.medicinesList && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-medilink-muted uppercase tracking-wider block">
                    Available Stock Items:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activePharmacy.medicinesList.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fulfilling Mode Selection CTA */}
            <div className="space-y-2 pt-3 border-t border-medilink-border">
              <Button
                variant="primary"
                className="w-full text-xs py-2.5 flex items-center justify-center gap-2 font-bold"
                onClick={() => navigate(`/patient/reserve?pharmacyId=${activePharmacy.id}&mode=PICKUP`)}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Reserve for Pickup (15 Mins)</span>
              </Button>

              <Button
                variant="secondary"
                className="w-full text-xs py-2.5 flex items-center justify-center gap-2 font-bold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200"
                onClick={() => navigate(`/patient/reserve?pharmacyId=${activePharmacy.id}&mode=EXPRESS_DELIVERY`)}
              >
                <Truck className="w-4 h-4 text-sky-700" />
                <span>Express Delivery (1-3 Hours)</span>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
