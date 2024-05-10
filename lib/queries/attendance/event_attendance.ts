import { EventActivity } from "@/entities/attendance/activity";
import {
  AttendanceType,
  ChurchActivityAttendance,
} from "@/entities/attendance/attendance";
import * as events from "@/entities/attendance/events";
import { fromDate } from "@internationalized/date";

export interface EventAttendanceQueryResult {
  attendance: ChurchActivityAttendance[];
  count: number;
}

export interface EventAttendanceQueryFilter {
  activity?: EventActivity;
  attendanceTypes: AttendanceType[];
}

export interface EventAttendanceQuery {
  getEventAttendanceList(
    eventId: string,
    filter: EventAttendanceQueryFilter,
    limit: number,
    lastId: string
  ): Promise<EventAttendanceQueryResult>;
}

export class MockEventAttendanceQuery implements EventAttendanceQuery {
  getEventAttendanceList(
    eventId: string,
    filter: EventAttendanceQueryFilter,
    limit: number,
    lastId: string
  ): Promise<EventAttendanceQueryResult> {
    let result: ChurchActivityAttendance[];
    result = [];

    for (let i: number = 1; i < limit; ++i) {
      let id = lastId + i;
      let attendanceType = "Regular" as AttendanceType;
      if (i % 3 == 0) {
        attendanceType = "Volunteer" as AttendanceType;
      }
      result.push(
        new ChurchActivityAttendance({
          id: id,
          securityCode: "1234",
          activity: new EventActivity({
            name: "test",
            id: "1",
            activityId: "1",
            time: fromDate(new Date(), "America/New_York"),
            eventId: eventId,
          }),
          securityNumber: 1234,
          checkinTime: new Date(),
          checkinLocation: new events.ChurchEventLocation({
            name: "test",
            id: "1",
          }),
          personId: "1",
          firstName: "test",
          middleName: "test",
          lastName: "test " + id,
          profilePictureUrl: "",
          attendanceType: attendanceType,
        })
      );
    }

    return Promise.resolve({ attendance: result, count: 200 });
  }
}

export const eventAttendanceQuery: EventAttendanceQuery =
  new MockEventAttendanceQuery();
