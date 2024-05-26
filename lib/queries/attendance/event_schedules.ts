import { Activity } from "@/entities/attendance/activity";
import {
  EventSchedule,
  EventScheduleType,
  WeeklyEventSchedule,
} from "@/entities/attendance/schedules";

export interface EventScheduleQuery {
  listEventSchedules(
    lastEventScheduleId: string,
    limit: number
  ): Promise<EventSchedule[]>;
  getEventSchedule(eventScheduleId: string): Promise<EventSchedule>;
}

export class MockEventScheduleQuery implements EventScheduleQuery {
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
  new MockEventScheduleQuery();
