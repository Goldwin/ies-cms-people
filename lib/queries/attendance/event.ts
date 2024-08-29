import { ChurchEvent } from "@/entities/attendance/events";
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
