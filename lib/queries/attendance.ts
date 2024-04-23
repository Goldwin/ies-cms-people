import {
  ChurchEvent,
  ChurchEventSession,
  ChurchEventSessionStats,
  ChurchEventStats,
  ChurchEventTimeConfig,
  EventType,
} from "@/entities/attendance/events";

export interface AttendanceQueries {
  listChurchEvents(lastId: string, limit: number): Promise<ChurchEvent[]>;
  getChurchEventStats(
    id: string,
    dateRange: { startDate: Date; endDate: Date }
  ): Promise<ChurchEventStats>;
  getChurchEventDetail(id: string): Promise<ChurchEvent>;
  getChurchEventSessionList(id: string): Promise<ChurchEventSession[]>;
}

class MockAttendanceQuery implements AttendanceQueries {
  getChurchEventSessionList(id: string): Promise<ChurchEventSession[]> {
    return Promise.resolve([
      new ChurchEventSession({
        eventId: "1",
        date: new Date(),
        sessionNumber: 1,
      }),
    ]);
  }
  getChurchEventDetail(id: string): Promise<ChurchEvent> {
    if (id !== "1") {
      return Promise.resolve(
        new ChurchEvent({
          id: "1",
          name: "test",
          eventType: EventType.ONE_TIME,
          timeConfig: new ChurchEventTimeConfig({
            startTime: 0,
            endTime: 0,
            timezoneOffset: 0,
          }),
        })
      );
    }
    return Promise.resolve(
      new ChurchEvent({
        id: "1",
        name: "test",
        eventType: EventType.WEEKLY,
        timeConfig: new ChurchEventTimeConfig({
          startTime: 0,
          endTime: 0,
          timezoneOffset: 0,
        }),
      })
    );
  }

  getChurchEventStats(id: string): Promise<ChurchEventStats> {
    if (id !== "1") {
      return Promise.resolve(
        new ChurchEventStats({
          id: "1",
          name: "test",
          sessions: [
            new ChurchEventSessionStats({
              id: "1",
              date: "2022-06-11",
              attendanceCount: 100,
            }),
          ],
        })
      );
    }
    return Promise.resolve(
      new ChurchEventStats({
        id: "1",
        name: "test",
        sessions: [
          new ChurchEventSessionStats({
            id: "1",
            date: "2022-06-11",
            attendanceCount: 100,
          }),
          new ChurchEventSessionStats({
            id: "1",
            date: "2022-06-12",
            attendanceCount: 50,
          }),
          new ChurchEventSessionStats({
            id: "1",
            date: "2022-06-13",
            attendanceCount: 35,
          }),
          new ChurchEventSessionStats({
            id: "1",
            date: "2022-06-14",
            attendanceCount: 70,
          }),
          new ChurchEventSessionStats({
            id: "1",
            date: "2022-06-15",
            attendanceCount: 90,
          }),
        ],
      })
    );
  }

  async listChurchEvents(
    lastId: string,
    limit: number
  ): Promise<ChurchEvent[]> {
    return Promise.resolve([
      new ChurchEvent({
        id: "1",
        name: "test",
        eventType: EventType.WEEKLY,
        timeConfig: new ChurchEventTimeConfig({
          startTime: 0,
          endTime: 0,
          timezoneOffset: 0,
        }),
      }),
      new ChurchEvent({
        id: "2",
        name: "test2",
        eventType: EventType.ONE_TIME,
        timeConfig: new ChurchEventTimeConfig({
          startTime: 0,
          endTime: 0,
          timezoneOffset: 0,
        }),
      }),
    ]);
  }
}

export const attendanceQuery: AttendanceQueries = new MockAttendanceQuery();
