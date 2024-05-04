import { AttendanceType } from "@/entities/attendance/attendance";
import {
  EventAttendanceCountSummary,
  EventScheduleSummary,
  EventSummary,
} from "@/entities/attendance/stats";

export interface ChurchEventStatsQuery {
  getEventStats(eventScheduleId: string): Promise<EventScheduleSummary>;
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

export const attendanceStatsQuery: ChurchEventStatsQuery =
  new MockEventStatsQuery();
