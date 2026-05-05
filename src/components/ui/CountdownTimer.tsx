"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  label?: string;
  compact?: boolean;
}

function getTimeUntilMidnight() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
  const midnight = new Date(istNow);
  midnight.setHours(23, 59, 59, 999);
  const diff = midnight.getTime() - istNow.getTime();
  return Math.max(0, Math.floor(diff / 1000));
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function CountdownTimer({ label = "Today's offer ends in", compact = false }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(getTimeUntilMidnight());
    const interval = setInterval(() => {
      setRemaining(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (remaining === null) {
    return null;
  }

  const { hours, minutes, seconds } = formatTime(remaining);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <svg className="h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-brand-grey-600">{label}</span>
        <span className="font-mono font-bold text-brand-orange">
          {hours}:{minutes}:{seconds}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-brand-grey-600">{label}</span>
      <div className="flex items-center gap-1">
        {[
          { value: hours, label: "hr" },
          { value: minutes, label: "min" },
          { value: seconds, label: "sec" },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-1">
            {i > 0 && <span className="text-brand-grey-400 font-bold">:</span>}
            <div className="flex flex-col items-center rounded-lg bg-brand-navy px-2 py-1">
              <span className="font-mono text-lg font-bold text-white">{unit.value}</span>
              <span className="text-[10px] uppercase text-brand-grey-300">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
