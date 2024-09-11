import { AttendanceType } from "@/entities/attendance/attendance";
import {
  EventAttendanceCountStats,
  EventScheduleStats,
  EventStats,
} from "@/entities/attendance/stats";

export interface ChurchEventStatsQuery {
  getEventStats(eventScheduleId: string): Promise<EventScheduleStats>;
}

export class MockEventStatsQuery implements ChurchEventStatsQuery {
  getEventStats(eventId: string): Promise<EventScheduleStats> {
    if (eventId !== "1") {
      return Promise.resolve(
        new EventScheduleStats({
          id: "2",
          name: "test2",
          eventSummaries: [
            new EventStats({
              id: "1",
              date: "2022-06-11",
              attendanceCount: [
                new EventAttendanceCountStats({
                  attendanceType: "Regular" as AttendanceType,
                  count: 100,
                }),
                new EventAttendanceCountStats({
                  attendanceType: "Volunteer" as AttendanceType,
                  count: 20,
                }),
                new EventAttendanceCountStats({
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
      new EventScheduleStats({
        id: "1",
        name: "test",
        eventSummaries: [
          new EventStats({
            id: "1",
            date: "2022-06-11",
            attendanceCount: [
              new EventAttendanceCountStats({
                attendanceType: "Regular" as AttendanceType,
                count: 100,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventStats({
            id: "1",
            date: "2022-06-12",
            attendanceCount: [
              new EventAttendanceCountStats({
                attendanceType: "Regular" as AttendanceType,
                count: 130,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventStats({
            id: "1",
            date: "2022-06-13",
            attendanceCount: [
              new EventAttendanceCountStats({
                attendanceType: "Regular" as AttendanceType,
                count: 125,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventStats({
            id: "1",
            date: "2022-06-14",
            attendanceCount: [
              new EventAttendanceCountStats({
                attendanceType: "Regular" as AttendanceType,
                count: 75,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Guest" as AttendanceType,
                count: 30,
              }),
            ],
          }),
          new EventStats({
            id: "1",
            date: "2022-06-15",
            attendanceCount: [
              new EventAttendanceCountStats({
                attendanceType: "Regular" as AttendanceType,
                count: 180,
              }),
              new EventAttendanceCountStats({
                attendanceType: "Volunteer" as AttendanceType,
                count: 20,
              }),
              new EventAttendanceCountStats({
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
