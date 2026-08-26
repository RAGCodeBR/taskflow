export type SchedulableEvent = {
  id: string;
  starts_at: string;
  ends_at: string;
  created_by?: string | null;
};

export type EventLayout<T extends SchedulableEvent> = {
  event: T;
  column: number;
  columns: number;
};

const eventStart = (event: SchedulableEvent) => new Date(event.starts_at).getTime();
const eventEnd = (event: SchedulableEvent) => new Date(event.ends_at).getTime();

export function eventsOverlap(a: SchedulableEvent, b: SchedulableEvent) {
  return eventStart(a) < eventEnd(b) && eventEnd(a) > eventStart(b);
}

export function hasCollaboratorConflict<T extends SchedulableEvent>(event: T, events: T[]) {
  if (!event.created_by) return false;
  return events.some(
    (candidate) =>
      candidate.id !== event.id &&
      candidate.created_by === event.created_by &&
      eventsOverlap(event, candidate),
  );
}

/**
 * Arranges connected collision groups into columns. A group can include events
 * that do not directly overlap, as long as they are linked through another
 * event; this prevents a card from being hidden behind a long event.
 */
export function buildEventLayouts<T extends SchedulableEvent>(events: T[]): EventLayout<T>[] {
  const sorted = [...events].sort(
    (a, b) => eventStart(a) - eventStart(b) || eventEnd(a) - eventEnd(b),
  );
  const groups: T[][] = [];
  let group: T[] = [];
  let latestEnd = -Infinity;

  for (const event of sorted) {
    if (group.length && eventStart(event) >= latestEnd) {
      groups.push(group);
      group = [];
      latestEnd = -Infinity;
    }
    group.push(event);
    latestEnd = Math.max(latestEnd, eventEnd(event));
  }
  if (group.length) groups.push(group);

  return groups.flatMap((collisionGroup) => {
    const columnEnds: number[] = [];
    const assigned = collisionGroup.map((event) => {
      const column = columnEnds.findIndex((end) => eventStart(event) >= end);
      const nextColumn = column === -1 ? columnEnds.length : column;
      columnEnds[nextColumn] = eventEnd(event);
      return { event, column: nextColumn };
    });
    return assigned.map(({ event, column }) => ({ event, column, columns: columnEnds.length }));
  });
}

export function snapDateToMinutes(date: Date, interval = 15) {
  const snapped = new Date(date);
  snapped.setSeconds(0, 0);
  snapped.setMinutes(Math.round(snapped.getMinutes() / interval) * interval);
  return snapped;
}
