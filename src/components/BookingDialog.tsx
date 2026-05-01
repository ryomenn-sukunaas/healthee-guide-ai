import { FormEvent, useState } from "react";
import { CalendarCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Doctor } from "@/data/mockData";

interface Props {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const BookingDialog = ({ doctor, open, onOpenChange }: Props) => {
  const [date, setDate] = useState(today());
  const [time, setTime] = useState("10:00");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!doctor) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      setReason("");
      toast.success(`Appointment requested with ${doctor.name} on ${date} at ${time}.`);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" /> Book appointment
          </DialogTitle>
          <DialogDescription>
            {doctor ? `${doctor.name} · ${doctor.specialization} · $${doctor.fees}` : "Schedule a consultation."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-foreground">
              Date
              <Input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1.5" />
            </label>
            <label className="block text-sm font-medium text-foreground">
              Time
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="mt-1.5" />
            </label>
          </div>
          <label className="block text-sm font-medium text-foreground">
            Reason for visit
            <Input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={140} placeholder="Brief description (optional)" className="mt-1.5" />
          </label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="hero-gradient-bg rounded-xl text-primary-foreground">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;