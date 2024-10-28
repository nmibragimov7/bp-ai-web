import React, {useId} from "react";
import {Input, InputNumber, InputProps} from "antd";

import {classNames} from "@/shared/lib/classNames";
import {isNotEmpty} from "@/shared/lib/checker";

import css from "./Field.module.scss";

interface FieldProps extends InputProps {
    label?: string;
    inputType?: "password" | "number" | "text";
    placeholder?: string;
    classNameWrap?: string;
    className?: string;
    classNameLabel?: string;
    classNameLabelActive?: string;
    value?: any;
    min?: number;
    max?: number;
    autoComplete?: string;
}

const Field: React.FC<FieldProps> = ({
    label,
    inputType = "text",
    placeholder,
    classNameWrap,
    className,
    classNameLabel,
    classNameLabelActive,
    value,
    prefix,
    min,
    max,
    autoComplete,
    ...props
}) => {
    const id = useId();
    const inputNumberProps: any = props;
    if (inputType === "password") {
        return (
            <>
                <div className={classNames(css.FieldWrap, classNameWrap || "")}>
                    <Input.Password
                        {...props}
                        id={id}
                        placeholder={placeholder}
                        className={classNames(css.Field, className || "", {
                            "border-primary": !!value,
                        })}
                        autoComplete={autoComplete}
                    />
                    {label ? (
                        <label
                            htmlFor={id}
                            className={classNames(
                                css.Label,
                                {[[css.ActiveInput, classNameLabelActive].join(" ")]: isNotEmpty(value)},
                                classNameLabel || "",
                            )}
                        >
                            {label}
                        </label>
                    ) : null}
                </div>
            </>
        );
    }
    if (inputType === "number") {
        return (
            <>
                <div className={classNames(css.FieldWrap, classNameWrap || "")}>
                    <InputNumber
                        {...inputNumberProps}
                        type={"number"}
                        id={id}
                        min={min}
                        max={max}
                        placeholder={placeholder}
                        prefix={prefix}
                        value={value}
                        className={classNames(css.Field, className || "", {
                            "border-primary": !!value || value === 0,
                        })}
                    />
                    {label ? (
                        <label
                            htmlFor={id}
                            className={classNames(
                                css.Label,
                                {[[css.ActiveInput, classNameLabelActive].join(" ")]: isNotEmpty(value)},
                                classNameLabel || "",
                            )}
                        >
                            {label}
                        </label>
                    ) : null}
                </div>
            </>
        );
    }
    return (
        <>
            <div className={classNames(css.FieldWrap, classNameWrap || "")}>
                <Input
                    {...props}
                    id={id}
                    placeholder={placeholder}
                    prefix={prefix}
                    value={value}
                    autoComplete={autoComplete}
                    className={classNames(css.Field, className || "", {
                        "border-primary": !!value,
                    })}
                />
                {label ? (
                    <label
                        htmlFor={id}
                        className={classNames(
                            css.Label,
                            {[[css.ActiveInput, classNameLabelActive].join(" ")]: isNotEmpty(value)},
                            classNameLabel || "",
                        )}
                    >
                        {label}
                    </label>
                ) : null}
            </div>
        </>
    );
};

export default Field;
