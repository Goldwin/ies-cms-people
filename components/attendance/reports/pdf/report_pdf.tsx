import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { ChurchEvent } from "@/entities/attendance/events";
import { Button } from "@nextui-org/button";
import { DownloadIcon } from "@/components/icons";
import saveAs from "file-saver";
import { eventAttendanceQuery } from "@/lib/queries/attendance/event_attendance";
import {
  AttendanceType,
  ChurchActivityAttendance,
} from "@/entities/attendance/attendance";

interface ReportConfig {
  id: string;
  name: string;
}

interface PdfReportProps {
  event?: ChurchEvent;
  config: ReportConfig;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 32,
    display: "flex",
    gap: 2,
    justifyContent: "space-between",
  },
  section: {
    gap: 2,
    flexGrow: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "column",
    width: "100%",
    display: "flex",
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "ultrabold",
    marginVertical: "auto",
  },
  subtitle: {
    fontSize: 8,
    fontWeight: "extrabold",
    color: "#707070",
    marginVertical: "auto",
  },
  subheader: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  sectionheader: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#c5c5c5",
    paddingHorizontal: 4,
    minHeight: 16,
  },
  sectiontitle: {
    fontSize: 8,
    fontWeight: "bold",
    marginVertical: "auto",
  },
  listitemcontainer: {
    flexDirection: "row",
    width: "auto",
    display: "flex",
    marginVertical: 0,
    marginHorizontal: 4,
  },
  list: {
    flexDirection: "column",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    borderLeft: "2px solid #c5c5c5",
  },
  oddlistitem: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 8,
    minHeight: 12,
    paddingHorizontal: 8,
    border: "1px solid #f5f5f5",
  },
  eventlistitem: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 8,
    minHeight: 12,
    paddingHorizontal: 8,
    backgroundColor: "#f5f5f5",
    border: "1px solid #f5f5f5",
  },
  content: {
    marginVertical: "auto",
  },
});

interface PdfReportData {
  event: ChurchEvent;
  config: ReportConfig;
  attendances: ChurchActivityAttendance[];
}

// Create Document Component
export const PdfReportDocument = ({
  event,
  config,
  attendances,
}: PdfReportData) => {
  return (
    <Document>
      {Object.values(AttendanceType).map((type) => (
        <Page size="A4" style={styles.page} key={type} break={true}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {event?.name} - {event?.getDateString()}
            </Text>
            <View style={styles.subheader}>
              <Text style={styles.subtitle}>Grouped by Type: {type}</Text>
              <Text style={styles.subtitle}>
                {`Regulars: ${
                  type === AttendanceType.Regular
                    ? attendances.filter((a) => a.attendanceType === type)
                        .length
                    : 0
                } `}
                {`Volunteers: ${
                  type === AttendanceType.Volunteer
                    ? attendances.filter((a) => a.attendanceType === type)
                        .length
                    : 0
                } `}
                {`Guests: ${
                  type === AttendanceType.Guest
                    ? attendances.filter((a) => a.attendanceType === type)
                        .length
                    : 0
                } `}
              </Text>
            </View>
          </View>

          {event.activities.map((activity) => (
            <View style={styles.section} key={activity.id}>
              <View style={styles.sectionheader}>
                <Text style={styles.sectiontitle}>{activity.name}</Text>
                <Text style={styles.subtitle}>
                  {`Regulars: ${
                    type === AttendanceType.Regular
                      ? attendances.filter((a) => a.attendanceType === type)
                          .length
                      : 0
                  } `}
                  {`Volunteers: ${
                    type === AttendanceType.Volunteer
                      ? attendances.filter((a) => a.attendanceType === type)
                          .length
                      : 0
                  } `}
                  {`Guests: ${
                    type === AttendanceType.Guest
                      ? attendances.filter((a) => a.attendanceType === type)
                          .length
                      : 0
                  } `}
                </Text>
              </View>
              <View style={styles.list}>
                {attendances
                  .filter(
                    (a) =>
                      a.activity.id === activity.id && a.attendanceType === type
                  )
                  .map((attendance, i) => (
                    <View key={attendance.id} style={styles.listitemcontainer}>
                      <View
                        style={
                          i % 2 === 0
                            ? styles.oddlistitem
                            : styles.eventlistitem
                        }
                      >
                        <Text style={styles.content}>
                          {`${attendance.getFullName()} ${
                            attendance.firstTime ? "- (First Timer)" : ""
                          }`}
                        </Text>
                        <Text style={styles.content}>
                          {`${
                            attendance.activity.name
                          } @ ${attendance.getCheckInTime()}`}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
};

async function downloadReport(
  event: ChurchEvent,
  config: ReportConfig
): Promise<void> {
  const fileName = `Attendance ${
    config.name
  } Report - ${event.getDateString()}.pdf`;
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

  const blob = await pdf(
    <PdfReportDocument
      event={event}
      config={config}
      attendances={attendances}
    />
  ).toBlob();
  saveAs(blob, fileName);

  return Promise.resolve();
}

export const DownloadPdfButton = ({ event, config }: PdfReportProps) => {
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
      <DownloadIcon size={12} /> PDF
    </Button>
  );
};
