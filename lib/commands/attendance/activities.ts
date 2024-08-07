import { Activity } from "@/entities/attendance/activity";
import { EventSchedule } from "@/entities/attendance/schedules";
import { attendanceService } from "@/services/attendance";

interface EventScheduleActivityCommands {
    createEventScheduleActivity(
        activity: Activity
    ): Promise<EventSchedule>;
    updateEventScheduleActivity(
        activity: Activity
    ): Promise<EventSchedule>;
}

const APIEventScheduleActivityCommands: EventScheduleActivityCommands = {
    createEventScheduleActivity: async function (
        activity: Activity
    ): Promise<EventSchedule> {
        return attendanceService.createEventScheduleActivity(activity);
    },
    updateEventScheduleActivity: async function (
        activity: Activity
    ): Promise<EventSchedule> {
        return attendanceService.updateEventScheduleActivity(activity);
    },
};

export const eventScheduleActivityCommands = APIEventScheduleActivityCommands