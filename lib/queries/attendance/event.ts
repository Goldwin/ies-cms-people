import { EventActivity } from "@/entities/attendance/activity";
import { ChurchEvent } from "@/entities/attendance/events";
import { parseAbsoluteToLocal } from "@internationalized/date";

interface EventQueryFilter {
  eventScheduleId: string;
  lastId: string;
  startDate: Date;
  endDate: Date;
  limit: number;
}

export interface EventQuery {
  listEvents(filter: EventQueryFilter): Promise<ChurchEvent[]>;
  getEvent(eventId: string): Promise<ChurchEvent>;
}

export class MockEventQuery implements EventQuery {
  getEvent(eventId: string): Promise<ChurchEvent> {
    return Promise.resolve(
      new ChurchEvent({
        id: "1",
        eventScheduleId: "1",
        date: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
        activities: [
          new EventActivity({
            name: "Adult Service",
            id: "1",
            activityId: "1",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            activityId: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
        ],
      })
    );
  }
  listEvents(filter: EventQueryFilter): Promise<ChurchEvent[]> {
    if (true) {
      return Promise.resolve([]);
    }
    return Promise.resolve([
      new ChurchEvent({
        id: "3",
        eventScheduleId: "1",
        date: parseAbsoluteToLocal("2024-04-25T00:00:00Z"),
        activities: [
          new EventActivity({
            name: "Adult Service",
            id: "1",
            activityId: "1",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            activityId: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
        ],
      }),
      new ChurchEvent({
        id: "2",
        eventScheduleId: "1",
        date: parseAbsoluteToLocal("2024-04-18T00:00:00Z"),
        activities: [
          new EventActivity({
            name: "Adult Service",
            id: "1",
            activityId: "1",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            activityId: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
        ],
      }),
      new ChurchEvent({
        id: "1",
        eventScheduleId: "1",
        date: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
        activities: [
          new EventActivity({
            name: "Adult Service",
            id: "1",
            activityId: "1",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            activityId: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
            eventId: "1",
          }),
        ],
      }),
    ]);
  }
}

export const eventQuery = new MockEventQuery();
