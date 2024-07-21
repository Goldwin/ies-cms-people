export interface TimezoneOption {
  label: string;
  value: number;
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { label: "GMT +7", value: 7 },
  { label: "GMT +8", value: 8 },
  { label: "GMT +9", value: 9 },
];
