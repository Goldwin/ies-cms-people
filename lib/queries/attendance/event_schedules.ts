import { Activity } from "@/entities/attendance/activity";
import {
  EventSchedule,
  EventScheduleType,
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
      new EventSchedule({
        id: "1",
        name: "test",
        type: EventScheduleType.Weekly,
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
            id: "1",
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
      new EventSchedule({
        id: "1",
        name: "test",
        type: EventScheduleType.OneTime,
        activities: [],
      }),
      new EventSchedule({
        id: "2",
        name: "test2",
        type: EventScheduleType.Daily,
        activities: [],
      }),
    ]);
  }
}

export const eventSchedulesQuery: EventScheduleQuery =
  new MockEventScheduleQuery();
