import React from 'react';
import {Button, Form, Select} from "antd";

import Field from "@/shared/ui/Field/Field.tsx";
import DatePicker from "@/shared/ui/Datepicker/Datepicker.tsx";

import {useForm} from "@/shared/hooks/useForm.ts";

import {TFilter} from "@/shared/types";

import {catalogs, validation} from "@/shared/constants";

interface FilterProps {
  isLoading: boolean;
  onFinish: (values: TFilter) => void;
}

const initial: TFilter = {
  catalog: undefined,
  date: "",
  limit: null,
  count: null,
  from: 3,
  to: 4,
};

const Filter: React.FC<FilterProps> = ({isLoading, onFinish}) => {
  const [form] = Form.useForm<TFilter>();
  const values = Form.useWatch([], form);
  const {isValidated} = useForm(form);

  const onSubmit = (values: TFilter) => {
    onFinish({
      ...values
    });
  };

  return (
    <>
      <p className={"text-primary text-2xl text-center my-6"}>Фильтры</p>
      <Form
        size={"large"}
        layout={"vertical"}
        initialValues={initial}
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          name="catalog"
          className={"mb-6"}
          rules={[{required: true, message: validation.REQUIRED}]}
        >
          <Select
            options={catalogs}
            className={"w-full !h-10 !rounded-none"}
            placeholder={"Выберите каталог"}
          />
        </Form.Item>
        <Form.Item
          name="date"
          className={"mb-6"}
          rules={[{required: true, message: validation.REQUIRED}]}
        >
          <DatePicker
            className={"!border-gray !px-6"}
            value={values?.date ? new Date(values.date) : null}
            setValue={(value: Date | null | undefined) => form.setFieldValue("date", value)}
          />
        </Form.Item>
        <Form.Item
          name={"limit"}
          className={"mb-6"}
          rules={[{required: true, message: validation.REQUIRED}]}
        >
          <Field
            inputType={"number"}
            label={"Количество выборки"}
            className={"store !h-10 !border-gray w-full"}
          />
        </Form.Item>
        <Form.Item
          name={"count"}
          className={"mb-6"}
          rules={[{required: true, message: validation.REQUIRED}]}
        >
          <Field
            inputType={"number"}
            label={"Количество кластеров"}
            className={"store !h-10 !border-gray w-full"}
          />
        </Form.Item>
        <p className={"mb-2"}>Ключевые слова</p>
        <div className={"flex items-center justify-between gap-4"}>
          <Form.Item
            name={"from"}
            className={"mb-6"}
            rules={[{required: true, message: validation.REQUIRED}]}
          >
            <Field
              inputType={"number"}
              label={"с"}
              className={"store !h-10 !border-gray w-full"}
            />
          </Form.Item>
          <Form.Item
            name={"to"}
            className={"mb-6"}
            rules={[{required: true, message: validation.REQUIRED}]}
          >
            <Field
              inputType={"number"}
              label={"по"}
              className={"store !h-10 !border-gray w-full"}
            />
          </Form.Item>
        </div>
        <Form.Item className={"mb-6"}>
          <Button
            type={"primary"}
            htmlType={"submit"}
            className={"w-full !h-10 text-white !text-lg !rounded-none disabled:!bg-gray disabled:!text-white"}
            disabled={isValidated || isLoading}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Filter;