import { PencilIcon } from "@/components/icons";
import { ChurchEvent } from "@/entities/attendance/events";
import { Link, Listbox, ListboxItem } from "@nextui-org/react";

export const ChurchEventAction = ({
  churchEvent,
}: {
  churchEvent: ChurchEvent;
}) => {
  return (
    <Link size="sm" href={"/attendance/events/" + churchEvent.id} className="hover:text-secondary">
      <PencilIcon />
    </Link>
  );
};

export const ChurchEventList = ({
  churchEvents,
  focusedEventId,
  onSelectionChange,
}: {
  churchEvents: ChurchEvent[];
  focusedEventId: string;
  onSelectionChange: (churchEvent: ChurchEvent) => void;
}) => {
  return (
    <div className="h-full p-5">
      <Listbox
        aria-label="church event list"
        defaultSelectedKeys={focusedEventId}
        selectionMode="none"
      >
        {churchEvents.map((churchEvent) => (
          <ListboxItem
            key={churchEvent.id}
            aria-label={churchEvent.name}
            onPress={() => {
              onSelectionChange(churchEvent);
            }}
            className={"capitalize " + (churchEvent.id === focusedEventId ? "bg-default-200" : "")}
            endContent={<ChurchEventAction churchEvent={churchEvent} />}
          >
            {churchEvent.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};
