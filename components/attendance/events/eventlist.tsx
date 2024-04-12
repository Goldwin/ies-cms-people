import { ChurchEvent } from "@/entities/attendance/events";
import { Listbox, ListboxItem } from "@nextui-org/react";

export const ChurchEventList = ({
  churchEvents,
  focusedEventId,
  onSelectionChange,
}: {
  churchEvents: ChurchEvent[];
  focusedEventId: string;
  onSelectionChange: (churchEvent: ChurchEvent) => void;
}) => {
  console.log(churchEvents);
  return (
    <div className="h-full p-5">      
      <Listbox
        aria-label="church event list"
        selectedKeys={focusedEventId}
        selectionMode="single"
      >
        {churchEvents.map((churchEvent) => (
          <ListboxItem
            key={churchEvent.id}
            aria-label={churchEvent.name}
            onPress={() => {
              onSelectionChange(churchEvent);
            }}
            className="capitalize"
          >
            {churchEvent.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};
