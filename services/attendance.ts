/**
 * @fileoverview
 * This file provides a client side interface to communicate with attendance services
 */
import { Activity } from "@/entities/attendance/activity";
import { ChurchEvent } from "@/entities/attendance/events";
import {
  DailyEventSchedule,
  EventSchedule,
  EventScheduleType,
  OneTimeEventSchedule,
  WeeklyEventSchedule,
} from "@/entities/attendance/schedules";
import { getToken } from "@/lib/commands/login";
import axios from "axios";

const API_URL = process.env.ATTENDANCE_URL ?? "";

interface ActivityDTO {
  id: string;
  name: string;
  scheduleId: string;
  hour: number;
  minute: number;
  timezoneOffset: number;
}
interface EventScheduleDTO {
  id: string;
  name: string;
  type: string;
  activities: ActivityDTO[];
  timezoneOffset: number;
  date?: string;
  days?: number[];
  startDate?: string;
  endDate?: string;
}

function toActivityDTO(activity: Activity): ActivityDTO {
  return {
    id: activity.id,
    name: activity.name,
    scheduleId: activity.scheduleId,
    hour: activity.hour,
    minute: activity.minute,
    timezoneOffset: activity.timezoneOffset,
  };
}

function toEventScheduleDTO(eventSchedule: EventSchedule): EventScheduleDTO {
  const dto: EventScheduleDTO = {
    id: eventSchedule.id,
    name: eventSchedule.name,
    type: eventSchedule.type,
    activities: eventSchedule.activities?.map((activity) => {
      return {
        id: activity.id,
        name: activity.name,
        scheduleId: activity.scheduleId,
        hour: activity.hour,
        minute: activity.minute,
        timezoneOffset: activity.timezoneOffset,
      };
    }),
    timezoneOffset: eventSchedule.timezoneOffset,
  };
  if (eventSchedule.type === EventScheduleType.Daily) {
    const dailySchedule = eventSchedule as DailyEventSchedule;
    dto.startDate = dailySchedule.startDate.toISOString();
    dto.endDate = dailySchedule.endDate.toISOString();
  } else if (eventSchedule.type === EventScheduleType.Weekly) {
    const weeklySchedule = eventSchedule as WeeklyEventSchedule;
    dto.days = weeklySchedule.days;
  } else if (eventSchedule.type === EventScheduleType.OneTime) {
    const oneTimeSchedule = eventSchedule as OneTimeEventSchedule;
    dto.date = oneTimeSchedule.date.toISOString();
  }

  return dto;
}

function toEventSchedule(dto: EventScheduleDTO): EventSchedule {
  if (dto.type === EventScheduleType.Daily) {
    return new DailyEventSchedule({
      id: dto.id,
      name: dto.name,
      startDate: dto.startDate ? new Date(dto.startDate) : new Date(),
      endDate: dto.endDate ? new Date(dto.endDate) : new Date(),
      activities: dto.activities?.map((activity: ActivityDTO): Activity => {
        return new Activity({
          id: activity.id,
          name: activity.name,
          scheduleId: dto.id,
          timeHour: activity.hour,
          timeMinute: activity.minute,
          timezoneOffset: activity.timezoneOffset,
        });
      }),
      timezoneOffset: dto.timezoneOffset,
    });
  }
  if (dto.type === EventScheduleType.Weekly) {
    return new WeeklyEventSchedule({
      id: dto.id,
      name: dto.name,
      days: dto.days ?? [],
      activities: dto.activities?.map((activity: ActivityDTO): Activity => {
        return new Activity({
          id: activity.id,
          name: activity.name,
          scheduleId: dto.id,
          timeHour: activity.hour,
          timeMinute: activity.minute,
          timezoneOffset: activity.timezoneOffset,
        });
      }),
      timezoneOffset: dto.timezoneOffset,
    });
  }
  if (dto.type === EventScheduleType.OneTime) {
    return new OneTimeEventSchedule({
      id: dto.id,
      name: dto.name,
      activities: dto.activities?.map((activity: ActivityDTO): Activity => {
        return new Activity({
          id: activity.id,
          name: activity.name,
          scheduleId: dto.id,
          timeHour: activity.hour,
          timeMinute: activity.minute,
          timezoneOffset: activity.timezoneOffset,
        });
      }),
      timezoneOffset: dto.timezoneOffset,
      date: dto.date ? new Date(dto.date) : new Date(),
    });
  }
  return new EventSchedule({
    id: dto.id,
    name: dto.name,
    type: dto.type as EventScheduleType,
    activities: dto.activities?.map((activity: ActivityDTO): Activity => {
      return new Activity({
        id: activity.id,
        name: activity.name,
        scheduleId: dto.id,
        timeHour: activity.hour,
        timeMinute: activity.minute,
        timezoneOffset: activity.timezoneOffset,
      });
    }),
    timezoneOffset: dto.timezoneOffset,
  });
}

export class AttendanceService {
  async listEvent(): Promise<ChurchEvent[]> {
    //TODO implement client to fetch list of events
    return Promise.resolve([]);
  }

  async createEventSchedule(
    eventSchedule: EventSchedule
  ): Promise<EventSchedule> {
    const url = API_URL + "/schedules";
    const token = getToken();
    const eventScheduleDTO: EventScheduleDTO =
      toEventScheduleDTO(eventSchedule);
    const body = JSON.stringify(eventScheduleDTO);

    return axios
      .post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return toEventSchedule(data);
      });
  }

  async updateEventSchedule(
    eventSchedule: EventSchedule
  ): Promise<EventSchedule> {
    const url = API_URL + "/schedules/" + eventSchedule.id;
    const token = getToken();
    const body = JSON.stringify(toEventScheduleDTO(eventSchedule));

    console.log(toEventScheduleDTO(eventSchedule));
    return axios
      .put(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return toEventSchedule(data);
      });
  }

  async listEventSchedule({
    limit = 100,
    lastID = "",
  }: {
    limit: number;
    lastID: string;
  }): Promise<EventSchedule[]> {
    const url = API_URL + "/schedules?limit=" + limit + "&last_id=" + lastID;
    const token = getToken();
    return axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return data.map((eventSchedule: EventScheduleDTO) => {
          return toEventSchedule(eventSchedule);
        });
      });
  }

  async getEventSchedule(id: string): Promise<EventSchedule> {
    const url = API_URL + "/schedules/" + id;
    const token = getToken();
    return axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return toEventSchedule(data);
      });
  }

  async createEventScheduleActivity(
    activity: Activity
  ): Promise<EventSchedule> {
    const url = API_URL + "/schedules/" + activity.scheduleId + "/activities";
    const token = getToken();
    const activityDTO: ActivityDTO = toActivityDTO(activity);
    const body = JSON.stringify(activityDTO);

    return axios
      .post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return toEventSchedule(data);
      });
  }

  async removeEventScheduleActivity(
    activity: Activity
  ): Promise<EventSchedule> {
    const url =
      API_URL +
      "/schedules/" +
      activity.scheduleId +
      "/activities/" +
      activity.id;
    const token = getToken();
    return axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return toEventSchedule(data);
      });
  }

  async updateEventScheduleActivity(
    activity: Activity
  ): Promise<EventSchedule> {
    const url =
      API_URL +
      "/schedules/" +
      activity.scheduleId +
      "/activities/" +
      activity.id;
    const token = getToken();
    const activityDTO: ActivityDTO = toActivityDTO(activity);
    const body = JSON.stringify(activityDTO);

    return axios
      .put(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data;
        return toEventSchedule(data);
      });
  }
}

export const attendanceService = new AttendanceService();
