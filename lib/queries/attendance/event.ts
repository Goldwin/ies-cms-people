import { EventActivity } from "@/entities/attendance/activity";
import { ChurchEvent } from "@/entities/attendance/events";
import { attendanceService } from "@/services/attendance";
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
  getEvent(scheduleId: string, eventId: string): Promise<ChurchEvent>;
}

class MockEventQuery implements EventQuery {
  getEvent(scheduleId: string, eventId: string): Promise<ChurchEvent> {
    return Promise.resolve(
      new ChurchEvent({
        id: "1",
        eventScheduleId: "1",
        date: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
        activities: [
          new EventActivity({
            name: "Adult Service",
            id: "1",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
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
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
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
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
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
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
          }),
          new EventActivity({
            name: "Sunday School",
            id: "2",
            time: parseAbsoluteToLocal("2024-04-11T00:00:00Z"),
          }),
        ],
      }),
    ]);
  }
}

class APIEventQuery implements EventQuery {
  listEvents(filter: EventQueryFilter): Promise<ChurchEvent[]> {
    return attendanceService.listEventBySchedule({
      scheduleId: filter.eventScheduleId,
      limit: filter.limit,
      lastId: filter.lastId,
      startDate: filter.startDate,
      endDate: filter.endDate,
    });
  }
  getEvent(scheduleId: string, eventId: string): Promise<ChurchEvent> {
    return attendanceService.getEvent({
      eventId: eventId,
      scheduleId: scheduleId,
    });
  }
}

export const eventQuery: EventQuery = new APIEventQuery();
