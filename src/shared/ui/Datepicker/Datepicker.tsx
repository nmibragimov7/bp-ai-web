import React from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);

import Field from "@/shared/ui/Field/Field";

import {classNames} from "@/shared/lib/classNames";

import calendarIcon from "@/shared/assets/images/svg/calendar.svg";

interface DatepickerProps {
  classNameWrap?: string;
  className?: string;
  label?: string;
  minDate?: Date | null | undefined;
  error?: boolean;
  value: Date | null | undefined;
  setValue: (value: Date | null | undefined) => void;
}

interface CustomInputProps {
  label?: string;
  className?: string;
  error?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
                                                   label,
                                                   className,
                                                   error,
                                                   ...props
                                                 }) => {
  return (
    <>
      <Field
        {...props}
        label={label}
        readOnly
        status={error ? "error" : undefined}
        suffix={<img src={calendarIcon} alt={""} className={"w-4 h-4"}/>}
        className={classNames("!h-10 !px-4", className || "")}
      />
    </>
  )
}

const Datepicker: React.FC<DatepickerProps> = ({
                                                 classNameWrap,
                                                 className,
                                                 label,
                                                 minDate,
                                                 error,
                                                 value,
                                                 setValue,
                                               }) => {
  return (
    <>
      <div className={classNames("flex justify-center", classNameWrap)}>
        <DatePicker
          locale={"ru"}
          dateFormat={"dd.MM.yyyy"}
          customInput={
            <CustomInput
              label={label}
              error={error}
              className={className}
            />
          }
          minDate={minDate}
          selected={value}
          showYearDropdown={!minDate}
          showMonthDropdown={!minDate}
          dropdownMode="select"
          onChange={setValue}
        />
      </div>
    </>
  );
};

export default Datepicker;
