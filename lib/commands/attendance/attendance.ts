import { ChurchActivityAttendance } from "@/entities/attendance/attendance";
import { attendanceService } from "@/services/attendance";

interface CheckinRequest {
  eventId: string;
  attendees: {
    personId: string;
    eventActivityId: string;
    attendanceType: string;
  }[];
  checkedInBy: string;
}

interface AttendanceCommands {
  checkin(request: CheckinRequest): Promise<ChurchActivityAttendance[]>;
}

class APIAttendanceCommandsImpl implements AttendanceCommands {
  async checkin(request: CheckinRequest): Promise<ChurchActivityAttendance[]> {
    return attendanceService.checkin(request);
  }
}

export const attendanceCommands = new APIAttendanceCommandsImpl();
