import React, { useState } from "react";
import { ChurchEvent } from "@/entities/attendance/events";
import { Button } from "@nextui-org/button";
import { DownloadIcon } from "@/components/icons";
import saveAs from "file-saver";
import { eventAttendanceQuery } from "@/lib/queries/attendance/event_attendance";
import {
  AttendanceType,
  ChurchActivityAttendance,
} from "@/entities/attendance/attendance";
import { asBlob, generateCsv, mkConfig } from "export-to-csv";

interface ReportConfig {
  id: string;
  name: string;
}

interface CsvReportProps {
  event?: ChurchEvent;
  config: ReportConfig;
}

interface CsvReportData {
  event: ChurchEvent;
  config: ReportConfig;
  attendances: ChurchActivityAttendance[];
}

function generateCsvBlob(data: CsvReportData): Blob {
  const csvConfig = mkConfig({ useKeysAsHeaders: true, fieldSeparator: ";" });
  const generate = generateCsv(csvConfig);
  const output = generate(
    data.attendances.map((attendance) => ({
      "First Name": attendance.person.firstName,
      "Last Name": attendance.person.lastName,
      "First Timers": attendance.firstTime ? "Yes" : "No",
      Activity: `${
        attendance.activity.name
      } @ ${attendance.activity.time.toLocaleTimeString()}`,
      "Attendance Type": attendance.attendanceType,
    }))
  );
  return asBlob(csvConfig)(output);
}

async function downloadReport(
  event: ChurchEvent,
  config: ReportConfig
): Promise<void> {
  const fileName = `Attendance ${
    config.name
  } Report - ${event.getDateString()}.csv`;
  let attendances: ChurchActivityAttendance[] = [];

  if (!event) {
    return;
  }

  const pushAttendances = (listAttendances: ChurchActivityAttendance[]) => {
    attendances.push(...listAttendances);
  };

  const fetchAttendances = async (lastId?: string) => {
    return eventAttendanceQuery
      .getEventAttendanceList(
        event.id,
        { attendanceTypes: Object.values(AttendanceType) },
        100,
        lastId ?? ""
      )
      .then((data) => {
        if (data.attendance.length > 0) {
          pushAttendances(data.attendance);
          const lastId = data.attendance[data.attendance.length - 1].id;
          fetchAttendances(lastId);
        }
        return attendances;
      });
  };

  await fetchAttendances();

  const blob = generateCsvBlob({
    event,
    config,
    attendances,
  });

  saveAs(blob, fileName);

  return Promise.resolve();
}

export const DownloadCsvButton = ({ event, config }: CsvReportProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      size="sm"
      onPress={() => {
        if (isLoading) {
          //do nothing...
          return;
        }
        setIsLoading(true);
        if (event) {
          downloadReport(event, config).then(() => {
            setIsLoading(false);
          });
        }
      }}
      isLoading={isLoading}
    >
      <DownloadIcon size={12} /> CSV
    </Button>
  );
};
