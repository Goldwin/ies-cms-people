import { EventSchedule } from "@/entities/attendance/schedules";
import { getToken } from "@/lib/commands/login";
import axios from "axios";

const API_URL = process.env.ATTENDANCE_URL ?? "";

interface ActivityDTO {
  id: string;
  name: string;
  scheduleId: string;
  timeHour: number;
  timeMinute: number;
  timezoneOffset: number;
}
interface EventScheduleDTO {
  id: string;
  name: string;
  type: string;
  activities: ActivityDTO[];
  timezoneOffset: number;
}

class AttendanceService {
  async createEventSchedule(
    eventSchedule: EventSchedule
  ): Promise<EventSchedule> {
    const url = API_URL + "/schedules";
    const token = getToken();
    return axios.post(url, eventSchedule, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateEventSchedule(
    eventSchedule: EventSchedule
  ): Promise<EventSchedule> {
    const url = API_URL + "/schedules";
    const token = getToken();
    return axios.put(url, eventSchedule, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const attendanceService = new AttendanceService();
