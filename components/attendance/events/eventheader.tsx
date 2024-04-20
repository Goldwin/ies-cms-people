import { ChurchEvent } from "@/entities/attendance/events";
import { Button, ButtonGroup } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Skeleton } from "@nextui-org/skeleton";

export const ChurchEventHeader = ({
  churchEvent,
}: {
  churchEvent: ChurchEvent | undefined;
}) => {
  return (
    <div className="flex flex-row mx-0 px-0 w-full bg-default-100">
      <div className="min-h-32 h-32 px-8 py-4">
        <Skeleton isLoaded={!!churchEvent}>
          <div className="flex flex-row gap-4 align-middle">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl capitalize">{churchEvent?.name}</h1>
              <div className="flex flex-row gap-2">
                <ButtonGroup size="sm">
                  <Button className="text-3xl" isIconOnly>
                    &#8249;
                  </Button>
                  <Button className="text-3xl" isIconOnly>
                    &#8250;
                  </Button>
                </ButtonGroup>
                <DatePicker variant="faded" />
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
