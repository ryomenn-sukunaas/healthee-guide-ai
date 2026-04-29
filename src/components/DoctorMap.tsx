import { useMemo, useState } from "react";
import { Crosshair, LocateFixed, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/data/mockData";

const bounds = {
  minLat: 25,
  maxLat: 43,
  minLng: -123,
  maxLng: -70,
};

const project = (lat: number, lng: number) => ({
  x: ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100,
  y: (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100,
});

const DoctorMap = ({ doctors }: { doctors: Doctor[] }) => {
  const [activeId, setActiveId] = useState(doctors[0]?.id ?? 0);
  const [userPoint, setUserPoint] = useState<{ lat: number; lng: number } | null>(null);
  const activeDoctor = doctors.find((doctor) => doctor.id === activeId) ?? doctors[0];

  const projectedDoctors = useMemo(
    () => doctors.map((doctor) => ({ ...doctor, point: project(doctor.coordinates.lat, doctor.coordinates.lng) })),
    [doctors],
  );

  const locateUser = () => {
    if (!navigator.geolocation) {
      toast.error("Location is not available in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPoint({ lat: position.coords.latitude, lng: position.coords.longitude });
        toast.success("Centered your approximate location.");
      },
      () => toast.error("Location permission was not granted."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const userProjection = userPoint ? project(userPoint.lat, userPoint.lng) : null;

  return (
    <div className="medical-card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Doctor Location Map</h2>
          <p className="text-sm text-muted-foreground">Compare mock clinics and optionally show your location.</p>
        </div>
        <Button onClick={locateUser} variant="outline" className="rounded-xl">
          <LocateFixed className="h-4 w-4" /> Use my location
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="relative min-h-[360px] overflow-hidden bg-secondary/50">
          <div className="absolute inset-6 rounded-[2rem] border border-border bg-card/70" />
          <div className="absolute left-[16%] top-[20%] h-[52%] w-[68%] rounded-[45%] border-2 border-primary/20 bg-background/70" />
          <div className="absolute left-[26%] top-[48%] h-[34%] w-[50%] rounded-[45%] border-2 border-accent/20 bg-secondary/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

          {projectedDoctors.map((doctor) => (
            <button
              key={doctor.id}
              onClick={() => setActiveId(doctor.id)}
              className={`absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 ${activeId === doctor.id ? "z-20 scale-110" : "z-10"}`}
              style={{ left: `${doctor.point.x}%`, top: `${doctor.point.y}%` }}
              aria-label={`Select ${doctor.name}`}
            >
              <MapPin className={`h-8 w-8 drop-shadow-md ${activeId === doctor.id ? "fill-primary text-primary" : "fill-accent text-accent"}`} />
            </button>
          ))}

          {userProjection && (
            <div className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: `${userProjection.x}%`, top: `${userProjection.y}%` }}>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Crosshair className="h-4 w-4" />
                <span className="absolute h-12 w-12 animate-ping rounded-full bg-primary/25" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-5 lg:border-l lg:border-t-0">
          {activeDoctor ? (
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl hero-gradient-bg text-sm font-bold text-primary-foreground">
                {activeDoctor.avatar}
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">{activeDoctor.name}</h3>
                <p className="text-sm font-medium text-primary">{activeDoctor.specialization}</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{activeDoctor.location}</p>
                <p>{activeDoctor.rating} rating · ${activeDoctor.fees} visit fee</p>
                <p>{activeDoctor.experience} years experience</p>
              </div>
              <p className="rounded-xl bg-secondary p-3 text-sm text-muted-foreground">“{activeDoctor.feedback}”</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No doctors match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorMap;
