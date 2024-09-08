import { EventActivity } from "@/entities/attendance/activity";
import {
  AttendanceType,
  ChurchActivityAttendance,
} from "@/entities/attendance/attendance";
import { PersonInfo } from "@/entities/attendance/person";
import { attendanceService } from "@/services/attendance";

export interface EventAttendanceQueryResult {
  attendance: ChurchActivityAttendance[];
  count: number;
}

export interface EventAttendanceQueryFilter {
  activity?: EventActivity;
  attendanceTypes: AttendanceType[];
  name?: string;
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
      let eventActivityId = "1";
      if (i % 4 == 0) {
        eventActivityId = "2";
      }
      const item = new ChurchActivityAttendance({
        id: id,
        securityCode: "1234",
        activity: new EventActivity({
          name: "test",
          id: eventActivityId,
          time: new Date(),
        }),
        securityNumber: 1234,
        checkinTime: new Date(),
        attendee: new PersonInfo({
          id: "1",
          firstName: "test",
          middleName: "test",
          lastName: "test " + id,
          age: 0,
          profilePictureUrl: "",
        }),
        checkedInBy: new PersonInfo({
          id: "1",
          firstName: "test",
          middleName: "test",
          lastName: "test " + id,
          age: 0,
          profilePictureUrl: "",
        }),
        attendanceType: attendanceType,
      });

      if (
        (!filter.activity || filter.activity?.id === item.activity?.id) &&
        filter.attendanceTypes.includes(item.attendanceType) &&
        (!filter.name ||
          filter.name === "" ||
          item.person.lastName.startsWith(filter.name) ||
          item.person.firstName.startsWith(filter.name) ||
          item.person.middleName?.startsWith(filter.name))
      ) {
        result.push(item);
      }
    }

    return Promise.resolve({ attendance: result, count: 200 });
  }
}

class APIEventAttendanceQuery implements EventAttendanceQuery {
  async getEventAttendanceList(
    eventId: string,
    filter: EventAttendanceQueryFilter,
    limit: number,
    lastId: string
  ): Promise<EventAttendanceQueryResult> {
    return attendanceService
      .listAttendanceByEvent({
        eventId: eventId,
        limit: limit,
        lastId: lastId,
      })
      .then((result) => {
        return { attendance: result, count: result.length };
      });
  }
}

export const eventAttendanceQuery: EventAttendanceQuery =
  new APIEventAttendanceQuery();
