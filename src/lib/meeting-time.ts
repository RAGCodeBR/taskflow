function minuteOfDay(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

export function meetingEndTime(startTime: string, durationMinutes: number): string {
  const start = minuteOfDay(startTime);
  if (start === null || !Number.isInteger(durationMinutes) || durationMinutes < 1) return "";
  const end = (start + durationMinutes) % 1440;
  return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
}

export function meetingDurationMinutes(startTime: string, endTime: string): number | null {
  const start = minuteOfDay(startTime);
  const end = minuteOfDay(endTime);
  if (start === null || end === null) return null;
  if (start === end) return 1440;
  return (end - start + 1440) % 1440;
}
