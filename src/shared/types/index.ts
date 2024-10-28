export type TFilter = {
  catalog: string | undefined;
  date: string;
  limit: number | null;
  count: number | null;
  from: number | null;
  to: number | null;
};

export type TOption = {
  value: any;
  label: string;
};

export type TValidation =
  "REQUIRED"
  | "EMAIL"
  | "NOT_REPEAT_PASSWORD"
  | "NOT_VALID_PERIOD"
  | "NOT_VALID_BIN"
  | "MIN_LENGTH_1";