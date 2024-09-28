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
