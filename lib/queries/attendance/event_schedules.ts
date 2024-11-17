import { Activity } from "@/entities/attendance/activity";
import {
  EventSchedule,
  EventScheduleType,
  WeeklyEventSchedule,
} from "@/entities/attendance/schedules";
import { attendanceService, AttendanceService } from "@/services/attendance";

export interface EventScheduleQuery {
  listEventSchedules(
    lastEventScheduleId: string,
    limit: number
  ): Promise<EventSchedule[]>;
  getEventSchedule(eventScheduleId: string): Promise<EventSchedule>;
}

class APIEventScheduleQuery implements EventScheduleQuery {
  private readonly _attendanceService: AttendanceService;

  constructor(attendanceService: AttendanceService) {
    this._attendanceService = attendanceService;
  }

  getEventSchedule(eventScheduleId: string): Promise<EventSchedule> {
    return this._attendanceService.getEventSchedule(eventScheduleId);
  }
  listEventSchedules(lastId: string, limit: number): Promise<EventSchedule[]> {
    return this._attendanceService.listEventSchedule({
      lastID: lastId,
      limit: limit,
    });
  }
}

export const eventSchedulesQuery: EventScheduleQuery =
  new APIEventScheduleQuery(attendanceService);
