import { EventSchedule } from "@/entities/attendance/schedules";
import { attendanceService } from "@/services/attendance";

export interface EventScheduleCommands {
  createEventSchedule(eventSchedule: EventSchedule): Promise<EventSchedule>;
  updateEventSchedule(eventSchedule: EventSchedule): Promise<EventSchedule>;
}

const APIEventScheduleCommands: EventScheduleCommands = {
  createEventSchedule: async function (
    eventSchedule: EventSchedule
  ): Promise<EventSchedule> {
    return attendanceService.createEventSchedule(eventSchedule);
  },
  updateEventSchedule: async function (
    eventSchedule: EventSchedule
  ): Promise<EventSchedule> {
    return attendanceService.updateEventSchedule(eventSchedule);
  },
};

export const eventScheduleCommands = APIEventScheduleCommands;
