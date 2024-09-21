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

class MockEventScheduleQuery implements EventScheduleQuery {
  getEventSchedule(eventScheduleId: string): Promise<EventSchedule> {
    return Promise.resolve(
      new WeeklyEventSchedule({
        id: "1",
        name: "test",
        days: [1, 2, 3, 4, 5, 6, 7],
        timezoneOffset: 7,
        activities: [
          new Activity({
            id: "1",
            name: "Adult Service",
            scheduleId: "1",
            timeHour: 9,
            timeMinute: 30,
            timezoneOffset: 7,
          }),
          new Activity({
            id: "2",
            name: "Sunday School",
            scheduleId: "2",
            timeHour: 9,
            timeMinute: 30,
            timezoneOffset: 7,
          }),
        ],
      })
    );
  }
  listEventSchedules(lastId: string, limit: number): Promise<EventSchedule[]> {
    return Promise.resolve([
      new WeeklyEventSchedule({
        id: "1",
        name: "test",
        days: [1, 2, 3, 4, 5, 6, 7],
        activities: [],
        timezoneOffset: 7,
      }),
      new EventSchedule({
        id: "2",
        name: "test2",
        type: EventScheduleType.Daily,
        activities: [],
        timezoneOffset: 7,
      }),
    ]);
  }
}

export const eventSchedulesQuery: EventScheduleQuery =
  new APIEventScheduleQuery(attendanceService);
