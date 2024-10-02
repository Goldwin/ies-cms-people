import { ChurchEvent } from "@/entities/attendance/events";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { DownloadPdfButton } from "./pdf/report_pdf";
import { DownloadCsvButton } from "./csv/report_csv";
import React from "react";

interface ReportType {
  id: string;
  name: string;
}

const reportTypes: ReportType[] = [
  {
    id: "1",
    name: "Weekly",
  },
];

interface ReportListProps {
  event?: ChurchEvent;
  classNames?: string;
}

const EventReportItem = ({
  event,
  reportType,
}: {
  event?: ChurchEvent;
  reportType: ReportType;
}) => {
  return (
    <>
      <Divider />
      <CardBody
        key={reportType.id}
        className="flex flex-col justify-between items-start gap-4"
      >
        <h1 className="text-md font-bold">{reportType.name} Report</h1>
        <div className="flex flex-row gap-2">
          <DownloadCsvButton event={event} config={reportType} />
          <DownloadPdfButton event={event} config={reportType} />
        </div>
      </CardBody>
    </>
  );
};

export const EventReportList = ({ ...props }: ReportListProps) => {
  return (
    <div className={props.classNames}>
      <Card className="flex w-full justify-start">
        <CardHeader className="text-md">Default Reports</CardHeader>
        {reportTypes.map((reportType) => (
          <EventReportItem
            key={reportType.id}
            reportType={reportType}
            event={props.event}
          />
        ))}
      </Card>
    </div>
  );
};
