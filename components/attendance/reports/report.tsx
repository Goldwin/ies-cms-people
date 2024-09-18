import { DownloadIcon } from "@/components/icons";
import { ChurchEvent } from "@/entities/attendance/events";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { DownloadPdfButton } from "./pdf/report_pdf";

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
          <Button size="sm">
            <DownloadIcon size={12} /> CSV
          </Button>

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
