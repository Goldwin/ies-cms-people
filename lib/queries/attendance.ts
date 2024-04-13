import {
  ChurchEvent,
  ChurchEventSessionStats,
  ChurchEventStats,
  EventType,
} from "@/entities/attendance/events";

export interface AttendanceQueries {
  listChurchEvents(lastId: string, limit: number): Promise<ChurchEvent[]>;
  getChurchEventStats(id: string, dateRange:{startDate: Date, endDate: Date}): Promise<ChurchEventStats>;
}

class MockAttendanceQuery implements AttendanceQueries {
  getChurchEventStats(id: string): Promise<ChurchEventStats> {
    if(id !== "1"){
        return Promise.resolve(new ChurchEventStats({id: "1", name: "test", sessions: [
          new ChurchEventSessionStats({id: "1", date: "2022-06-11", attendanceCount: 100}),
        ]}));
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
        time: "10:00",
      }),
      new ChurchEvent({
        id: "2",
        name: "test2",
        eventType: EventType.ONE_TIME,
        time: "10:00",
      }),
    ]);
  }
}

export const attendanceQuery: AttendanceQueries = new MockAttendanceQuery();
