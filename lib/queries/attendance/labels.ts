import { Label } from "@/entities/attendance/label";
import { attendanceService } from "@/services/attendance";

interface LabelFilter {
  limit: number;
  lastId: string;
}

interface LabelQueries {
  ListLabels(filter: LabelFilter): Promise<Label[]>;
  GetLabel(labelId: string): Promise<Label>;
}

class APILabelQueriesImpl implements LabelQueries {
  ListLabels(filter: LabelFilter): Promise<Label[]> {
    return attendanceService.listLabels(filter);
  }
  GetLabel(labelId: string): Promise<Label> {
    return attendanceService.getLabel(labelId);
  }
}

export const labelQueries: LabelQueries = new APILabelQueriesImpl();
