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
    const eventScheduleDTO: EventScheduleDTO = {
      id: eventSchedule.id,
      name: eventSchedule.name,
      type: eventSchedule.type,
      activities: eventSchedule.activities?.map((activity) => {
        return {
          id: activity.id,
          name: activity.name,
          scheduleId: activity.scheduleId,
          timeHour: activity.timeHour,
          timeMinute: activity.timeMinute,
          timezoneOffset: activity.timezoneOffset,
        };
      }),
      timezoneOffset: eventSchedule.timezoneOffset,
    };

    const body = JSON.stringify(eventScheduleDTO);

    return axios
      .post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return new EventSchedule({
          id: data.id,
          name: data.name,
          type: data.type,
          activities: data.activities?.map((activity: ActivityDTO) => {
            return {
              id: activity.id,
              name: activity.name,
              scheduleId: activity.scheduleId,
              timeHour: activity.timeHour,
              timeMinute: activity.timeMinute,
              timezoneOffset: activity.timezoneOffset,
            };
          }),
          timezoneOffset: data.timezoneOffset,
        });
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
