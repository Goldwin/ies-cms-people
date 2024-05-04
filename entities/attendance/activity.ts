class EventActivity {
  id: string;
  eventId: string;
  name: string;
  date: string;

  constructor({
    id,
    name,
    date,
    eventId,
  }: {
    id: string;
    name: string;
    date: string;
    eventId: string;
  }) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.eventId = eventId;
  }
}
