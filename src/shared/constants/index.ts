import {TOption, TValidation} from "@/shared/types";

export const validation: Record<TValidation, any> = {
  REQUIRED: "Обязательно поле",
  EMAIL: "Некорректный email",
  NOT_REPEAT_PASSWORD: "Пароли не совпадают",
  NOT_VALID_PERIOD: "Некорректный период",
  NOT_VALID_BIN: "Некорректный БИН",
  MIN_LENGTH_1: "Необходимо добавить хотя бы одно поле",
};

export const catalogs: TOption[] = [
  {
    label: "Смартфоны",
    value: "smartphones",
  },
  {
    label: "Робот-пылесосы",
    value: "robot_cleaners",
  },
  {
    label: "Кондиционеры",
    value: "conditioners",
  },
  {
    label: "Обогреватели",
    value: "heaters",
  },
];