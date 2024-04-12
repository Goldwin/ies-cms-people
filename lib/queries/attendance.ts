import { ChurchEvent } from "@/entities/attendance/events";

export interface AttendanceQueries {
    ListChurchEvents(lastId: string, limit: number):Promise<ChurchEvent[]>
}

class MockAttendanceQuery implements AttendanceQueries {

    async ListChurchEvents(lastId: string, limit: number):Promise<ChurchEvent[]> {
        return Promise.resolve([new ChurchEvent({id: "1", name: "test"}), new ChurchEvent({id : "2", name: "test2"})])
    }
}

export const attendanceQuery: AttendanceQueries = new MockAttendanceQuery()