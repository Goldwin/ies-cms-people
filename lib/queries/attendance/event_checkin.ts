import { ChurchEventSessionCheckIn } from "@/entities/attendance/events";

export interface EventCheckInQuery {
  getEventCheckInList(
    eventId: string,
    limit: number,
    lastId: string
  ): Promise<ChurchEventSessionCheckIn[]>;
}

export class MockEventCheckInQuery implements EventCheckInQuery {
  getEventCheckInList(
    eventId: string,
    limit: number,
    lastId: string
  ): Promise<ChurchEventSessionCheckIn[]> {
    return Promise.resolve([]);
  }
}

export const eventCheckinQuery: EventCheckInQuery = new MockEventCheckInQuery();
