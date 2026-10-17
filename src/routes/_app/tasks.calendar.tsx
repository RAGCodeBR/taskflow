import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "@/components/TaskCalendar";

export const Route = createFileRoute("/_app/tasks/calendar")({ component: CalendarPage });
