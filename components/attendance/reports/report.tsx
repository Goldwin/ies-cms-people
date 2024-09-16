import { DownloadIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

interface ReportType {
  id: string;
  name: string;
}

const reportTypes: ReportType[] = [
  {
    id: "1",
    name: "Weekly Report",
  },
];

interface ReportListProps {
  classNames?: string;
}

export const EventReportList = (props: ReportListProps) => {
  return (
    <div className={props.classNames}>
      <Card className="flex w-full justify-start">
        <CardHeader className="text-md">Default Reports</CardHeader>
        {reportTypes.map((reportType) => (
          <>
            <Divider />
            <CardBody
              key={reportType.id}
              className="flex flex-col justify-between items-start gap-4"
            >
              <h1 className="text-md font-bold">{reportType.name}</h1>
              <div className="flex flex-row gap-2">
                <Button size="sm">
                  <DownloadIcon size={12} /> CSV
                </Button>
                <Button size="sm">
                  <DownloadIcon size={12} /> PDF
                </Button>
              </div>
            </CardBody>
          </>
        ))}
      </Card>
    </div>
  );
};
