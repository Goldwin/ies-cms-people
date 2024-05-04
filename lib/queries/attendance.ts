import { AttendanceType } from "@/entities/attendance/attendance";
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
import {
  EventAttendanceCountSummary,
  EventScheduleSummary,
  EventSummary,
} from "@/entities/attendance/stats";

export interface ChurchEventStatsQuery {
  getEventStats(eventScheduleId: string): Promise<EventScheduleSummary>;
}

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

export class MockEventStatsQuery implements ChurchEventStatsQuery {
  getEventStats(eventId: string): Promise<EventScheduleSummary> {
    if (eventId !== "1") {
      return Promise.resolve(
        new EventScheduleSummary({
          id: "2",
          name: "test2",
          eventSummaries: [
            new EventSummary({
              id: "1",
              date: "2022-06-11",
              attendanceCount: [
                new EventAttendanceCountSummary({
                  attendanceType: "Regular" as AttendanceType,
                  count: 100,
                }),
                new EventAttendanceCountSummary({
                  attendanceType: "Volunteer" as AttendanceType,
                  count: 20,
                }),
                new EventAttendanceCountSummary({
                  attendanceType: "Guest" as AttendanceType,
                  count: 30,
                }),
              ],
            }),
          ],
        })
      );
    }
    return Promise.resolve(
      new EventScheduleSummary({
        id: "1",
        name: "test",
        eventSummaries: [
          new EventSummary({
            id: "1",
            date: "2022-06-11",
            attendanceCount: [
              new EventAttendanceCountSummary({
                attendanceType: "Regular" as AttendanceType,
                count: 100,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventSummary({
            id: "1",
            date: "2022-06-12",
            attendanceCount: [
              new EventAttendanceCountSummary({
                attendanceType: "Regular" as AttendanceType,
                count: 130,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventSummary({
            id: "1",
            date: "2022-06-13",
            attendanceCount: [
              new EventAttendanceCountSummary({
                attendanceType: "Regular" as AttendanceType,
                count: 125,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventSummary({
            id: "1",
            date: "2022-06-14",
            attendanceCount: [
              new EventAttendanceCountSummary({
                attendanceType: "Regular" as AttendanceType,
                count: 75,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventSummary({
            id: "1",
            date: "2022-06-15",
            attendanceCount: [
              new EventAttendanceCountSummary({
                attendanceType: "Regular" as AttendanceType,
                count: 180,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountSummary({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
        ],
      })
    );
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

export const attendanceStatsQuery: ChurchEventStatsQuery =
  new MockEventStatsQuery();

export const eventSchedulesQuery: EventScheduleQuery =
  new MockEventScheduleQuery();
