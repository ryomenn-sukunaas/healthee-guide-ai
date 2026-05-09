import { useEffect, useMemo, useState } from "react";
import { LocateFixed } from "lucide-react";
import { toast } from "sonner";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/data/mockData";

const doctorIcon = L.divIcon({
  className: "",
  html: `<div style="background:hsl(168 60% 38%);width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 12px rgba(0,0,0,0.25);border:2px solid white;"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;"><div style="background:hsl(210 70% 50%);width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 2px hsl(210 70% 50%);"></div></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const Recenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, Math.max(map.getZoom(), 6), { duration: 1.2 });
  }, [center, map]);
  return null;
};

const DoctorMap = ({ doctors }: { doctors: Doctor[] }) => {
  const [userPoint, setUserPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [center, setCenter] = useState<[number, number]>([22.9734, 78.6569]);

  const center0 = useMemo<[number, number]>(() => {
    if (doctors.length === 0) return [22.9734, 78.6569];
    const lat = doctors.reduce((s, d) => s + d.coordinates.lat, 0) / doctors.length;
    const lng = doctors.reduce((s, d) => s + d.coordinates.lng, 0) / doctors.length;
    return [lat, lng];
  }, [doctors]);

  useEffect(() => setCenter(center0), [center0]);

  const locateUser = () => {
    if (!navigator.geolocation) {
      toast.error("Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserPoint(point);
        setCenter([point.lat, point.lng]);
        toast.success("Centered on your location.");
      },
      () => toast.error("Location permission was not granted."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="medical-card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Doctor Location Map</h2>
          <p className="text-sm text-muted-foreground">Real interactive map. Click pins for details.</p>
        </div>
        <Button onClick={locateUser} variant="outline" className="rounded-xl">
          <LocateFixed className="h-4 w-4" /> Use my location
        </Button>
      </div>

      <div className="h-[420px] w-full">
        <MapContainer center={center0} zoom={5} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={center} />
          {doctors.map((d) => (
            <Marker key={d.id} position={[d.coordinates.lat, d.coordinates.lng]} icon={doctorIcon}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-bold text-sm">{d.name}</p>
                  <p className="text-xs text-gray-600">{d.specialization}</p>
                  <p className="text-xs">{d.location} · ⭐ {d.rating} · ₹{d.fees}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {userPoint && (
            <Marker position={[userPoint.lat, userPoint.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default DoctorMap;
