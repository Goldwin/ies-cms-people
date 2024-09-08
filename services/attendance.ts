/**
 * @fileoverview
 * This file provides a client side interface to communicate with attendance services
 */
import { Activity, EventActivity } from "@/entities/attendance/activity";
import {
  AttendanceType,
  ChurchActivityAttendance,
} from "@/entities/attendance/attendance";
import { ChurchEvent } from "@/entities/attendance/events";
import { HouseholdInfo, PersonInfo } from "@/entities/attendance/person";
import {
  DailyEventSchedule,
  EventSchedule,
  EventScheduleType,
  OneTimeEventSchedule,
  WeeklyEventSchedule,
} from "@/entities/attendance/schedules";
import { getToken } from "@/lib/commands/login";
import { fromDate } from "@internationalized/date";
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

interface EventActivityDTO {
  id: string;
  name: string;
  time: Date;
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

interface EventDTO {
  id: string;
  eventScheduleId: string;
  date: string;
  activities: ActivityDTO[];
  name: string;
}

interface HouseholdDTO {
  id: string;
  name: string;
  pictureUrl: string;
  householdHead: PersonDTO;
  members: PersonDTO[];
}

interface PersonDTO {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  age: number;
}

function toPersonInfo(person: PersonDTO): PersonInfo {
  console.log(person)
  return new PersonInfo({
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
    profilePictureUrl: person.profilePictureUrl,
    age: person.age,
  });
}

function toHouseholdInfo(household: HouseholdDTO): HouseholdInfo {
  return new HouseholdInfo({
    id: household.id,
    name: household.name,
    pictureUrl: household.pictureUrl,
    householdHead: toPersonInfo(household.householdHead),
    members: household.members.map((member) => toPersonInfo(member)),
  });
}

function toChurchEvent(data: EventDTO): ChurchEvent {
  return new ChurchEvent({
    id: data.id,
    eventScheduleId: data.eventScheduleId,
    date: fromDate(new Date(data.date), "UTC"),
    name: data.name,
    activities: data.activities.map((activity) => {
      return new EventActivity({
        id: activity.id,
        name: activity.name,
        time: fromDate(
          new Date(`${data.date}T${activity.hour}:${activity.minute}:00.000Z`),
          "UTC"
        ).toDate(),
      });
    }),
  });
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

interface AttendanceDTO {
  id: string;
  event: EventDTO;
  activity: EventActivityDTO;
  attendee: PersonDTO;
  checkedInBy: PersonDTO;
  securityCode: string;
  securityNumber: number;
  checkinTime: string;
  attendanceType: string;
}

function toChurchActivityAttendance(
  dto: AttendanceDTO
): ChurchActivityAttendance {
  return new ChurchActivityAttendance({
    id: dto.id,
    attendee: toPersonInfo(dto.attendee),
    checkedInBy: toPersonInfo(dto.checkedInBy),
    securityCode: dto.securityCode,
    securityNumber: dto.securityNumber,
    checkinTime: new Date(dto.checkinTime),
    activity: new EventActivity({
      id: dto.activity.id,
      name: dto.activity.name,
      time: new Date(dto.activity.time),
    }),
    attendanceType: dto.attendanceType as AttendanceType,
  });
}

export class AttendanceService {
  async listEventBySchedule({
    scheduleId,
    startDate,
    endDate,
    lastId = "",
    limit = 100,
  }: {
    scheduleId: string;
    limit: number;
    startDate: Date;
    endDate: Date;
    lastId: string;
  }): Promise<ChurchEvent[]> {
    const url = `${API_URL}/schedules/${scheduleId}/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&limit=${limit}&endDate=${endDate.toISOString()}&limit=${limit}&lastId=${lastId}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const data: EventDTO[] = response.data.data as EventDTO[];

        return data.map((event: EventDTO): ChurchEvent => {
          return toChurchEvent(event);
        });
      });
  }

  public async listAttendanceByEvent({
    eventId,
    lastId = "",
    limit = 100,
  }: {
    eventId: string;
    lastId: string;
    limit: number;
  }) : Promise<ChurchActivityAttendance[]> {
    const scheduleId = eventId.split(".")[0];
    const url = `${API_URL}/schedules/${scheduleId}/events/${eventId}/attendees?limit=${limit}&lastId=${lastId}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const data: AttendanceDTO[] = response.data.data as AttendanceDTO[];
        return data.map((attendance: AttendanceDTO): ChurchActivityAttendance => {
          return toChurchActivityAttendance(attendance);
        });
      });
  }

  async searchHousehold({
    name,
    limit = 200,
  }: {
    name: string;
    limit: number;
  }): Promise<HouseholdInfo[]> {
    const url = `${API_URL}/households/search`;
    return axios
      .post(
        url,
        {
          namePrefix: name,
          limit: limit,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        const data: HouseholdDTO[] = response.data.data as HouseholdDTO[];

        return data.map((household: HouseholdDTO): HouseholdInfo => {
          return toHouseholdInfo(household);
        });
      });
  }

  async createNextEvent(eventSchedule: EventSchedule): Promise<ChurchEvent[]> {
    const url =
      API_URL + "/schedules/" + eventSchedule.id + "/create-next-event";
    const token = getToken();
    return axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data: EventDTO[] = response.data.data as EventDTO[];

        return data.map((event: EventDTO): ChurchEvent => {
          return toChurchEvent(event);
        });
      });
  }

  async getEvent({
    scheduleId,
    eventId,
  }: {
    scheduleId: string;
    eventId: string;
  }): Promise<ChurchEvent> {
    const url = `${API_URL}/schedules/${scheduleId}/events/${eventId}`;
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const data: EventDTO = response.data.data as EventDTO;
        return toChurchEvent(data);
      });
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

  async checkin({
    eventId,
    attendees,
    checkedInBy,
  }: {
    eventId: string;
    checkedInBy: string;
    attendees: {
      personId: string;
      eventActivityId: string;
      attendanceType: string;
    }[];
  }): Promise<ChurchActivityAttendance[]> {
    const scheduleId = eventId.split(".")[0];
    const url = `${API_URL}/schedules/${scheduleId}/events/${eventId}/checkin`;
    const token = getToken();
    const checkinRequest = {
      eventId: eventId,
      attendees: attendees,
      checkedinBy: checkedInBy,
    };
    const body = JSON.stringify(checkinRequest);
    return axios
      .post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.data as AttendanceDTO[];

        console.log(data);
        return data.map((attendance: AttendanceDTO) => {
          return toChurchActivityAttendance(attendance);
        });
      });
  }
}

export const attendanceService = new AttendanceService();
