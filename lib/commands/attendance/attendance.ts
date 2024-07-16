import { EventSchedule } from "@/entities/attendance/schedules";

interface EventScheduleCommands {
    createEventSchedule(eventSchedule: EventSchedule):Promise<EventSchedule>
    updateEventSchedule(eventSchedule: EventSchedule):Promise<EventSchedule>
}

const APIEventScheduleCommands:EventScheduleCommands = {
    createEventSchedule: async function (eventSchedule: EventSchedule): Promise<EventSchedule> {
        throw new Error("Function not implemented.");
    },
    updateEventSchedule: async function (eventSchedule: EventSchedule): Promise<EventSchedule> {
        throw new Error("Function not implemented.");
    }
}