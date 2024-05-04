import {
  ChurchEvent,
  ChurchEventSession,
  ChurchEventSessionCheckIn,
  ChurchEventStats,
} from "@/entities/attendance/events";
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
      })
    );
  }
  listEventSchedules(lastId: string, limit: number): Promise<EventSchedule[]> {
    return Promise.resolve([
      new EventSchedule({
        id: "1",
        name: "test",
        type: EventScheduleType.OneTime,
      }),
      new EventSchedule({
        id: "2",
        name: "test2",
        type: EventScheduleType.Daily,
      }),
    ]);
  }
}

/** @deprecated */
export interface AttendanceQueries {
  listChurchEvents(lastId: string, limit: number): Promise<ChurchEvent[]>;
  getChurchEventStats(
    id: string,
    dateRange: { startDate: Date; endDate: Date }
  ): Promise<ChurchEventStats>;
  getChurchEventDetail(id: string): Promise<ChurchEvent>;
  getChurchEventSessionList(id: string): Promise<ChurchEventSession[]>;
  getChurchEventSessionCheckInList(
    id: string,
    sessionNo: number,
    limit: number,
    lastId: string
  ): Promise<ChurchEventSessionCheckIn[]>;
}

export const eventSchedulesQuery: EventScheduleQuery =
  new MockEventScheduleQuery();
