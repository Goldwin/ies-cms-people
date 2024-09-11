import { ChurchEvent } from "@/entities/attendance/events";
import { EventScheduleStats } from "@/entities/attendance/stats";
import { EventAttendanceSummary } from "@/entities/attendance/summary";
import { attendanceService } from "@/services/attendance";

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
  getSummary(
    scheduleId: string,
    eventId: string
  ): Promise<EventAttendanceSummary>;
}

class APIEventQuery implements EventQuery {
  getSummary(
    scheduleId: string,
    eventId: string
  ): Promise<EventAttendanceSummary> {
    return attendanceService.getEventAttendanceSummary({
      eventId: eventId,
    });
  }

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
