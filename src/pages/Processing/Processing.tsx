import {useMemo, useState} from "react";
import {Button, notification, Skeleton, Table} from "antd";
import type {ColumnsType} from 'antd/es/table';

import Sidebar from "@/widgets/Sidebar/Sidebar.tsx";

import {useBrands} from "@/entities/Brand/Brand.module.ts";
import {useSeries, useSeriesCreateMany} from "@/entities/Series/Series.module.ts";
import {useCategories, useCategoryCreateMany} from "@/entities/Category/Category.module.ts";

import {test} from "@/shared/lib/test.ts";

import menuIcon from "@/shared/assets/images/svg/menu.svg";
import {toLocalZone} from "@/shared/lib/date.ts";

const Processing = () => {
  const items = Array.from(new Set(test).values());

  const [visible, setVisible] = useState(false);

  const {data: brands, isFetching: isFetchingBrand} = useBrands({catalog: "heaters"});
  const {data: series, isFetching: isFetchingSeries, refetch: refetchSeries} = useSeries({catalog: "heaters"});
  const {data: categories, isFetching: isFetchingCategories, refetch: refetchCategories} = useCategories({catalog: "heaters"});
  const onSuccess = async (key: string, message?: string) => {
    if (key === "create-many") {
      notification.success({
        message,
      });
      await refetchSeries();
      await refetchCategories();
    }
  }
  const seriesCreateMutate = useSeriesCreateMany(onSuccess);
  const categoryCreateMutate = useCategoryCreateMany(onSuccess);

  const onFindBrand = (category: string) => {
    if (!brands || (brands && !brands.length)) return "";

    return brands.find((item: any) => {
      if (item?.title.split(" ").length > 1) {
        if (category.toLowerCase().includes(item?.title.toLowerCase())) {
          return item;
        }
      } else {
        if (category.split(" ").find(text => text.toLowerCase() === item?.title.toLowerCase())) {
          return item;
        }
      }
      return "";
    });
  }
  const onFindSeriesId = (title: string) => {
    if (!series || (series && !series.length)) return "";

    return series.find((item: any) => item.title.toLowerCase() === title.toLowerCase())?.id || "";
  }
  const onFindCategorySlug = (title: string) => {
    if (!categories || (categories && !categories.length)) return "";

    return categories.find((item: any) => item.title.toLowerCase() === title.toLowerCase());
  }
  const onGetSeries = (brand: string, category: string) => {
    if (!brand || !category) return "";

    const idx = category.split(" ").findIndex((item: string) => (brand.split(" ").length === 1 && item === brand) || (brand.split(" ").length > 1 && item === brand.split(" ")[0]));

    if (idx >= 0) {
      return category.split(" ").slice(brand.split(" ").length === 1 ? (idx + 1) : (idx + 2)).join(" ");
    }

    return "";
  }

  const rows = useMemo(() => {
    if(!brands || (brands && !brands.length)) return [];
    // if(!series || (series && !series.length)) return [];
    // if(!categories || (categories && !categories.length)) return [];
    if (!items) return [];

    return items.map((item: string) => {
      const brand = onFindBrand(item);
      const series = onGetSeries(brand?.title, item);
      const category = onFindCategorySlug(item);

      return {
        brand: brand?.title,
        brandID: brand?.id,
        seriesID: onFindSeriesId(series),
        series,
        category: item,
        categoryID: category?.id || "",
        slug: category?.slug || "",
      }
    });
  }, [brands, series, categories, items]);
  const columns: ColumnsType = [
    {
      title: "Бренд",
      dataIndex: "brand",
    },
    {
      title: "Бренд ID",
      dataIndex: "brandID",
    },
    {
      title: "Серия",
      dataIndex: "series",
    },
    {
      title: "Серия ID",
      dataIndex: "seriesID",
    },
    {
      title: "Категория",
      dataIndex: "category",
    },
    {
      title: "Категория ID",
      dataIndex: "categoryID",
    },
    {
      title: "Ссылка",
      dataIndex: "slug",
    },
  ];

  const onSave = (key: string) => {
    if (key === "series") {
      seriesCreateMutate.mutate({
        list: rows
          .filter((values: any) => values?.brand && values?.series && values?.category)
          .map((values: any) => ({
            createAt: toLocalZone(new Date().toISOString()),
            store: "Kaspi",
            brandID: values?.brandID,
            title: values?.series,
            catalog: "heaters",
        })),
      });
    }

    if (key === "categories") {
      categoryCreateMutate.mutate({
        list: rows
          .filter((values: any) => values?.brand && values?.series && values?.category)
          .map((values: any) => ({
            createAt: toLocalZone(new Date().toISOString()),
            title: values?.category,
            catalog: "heaters",
            isTop: false,
            slug: "",
            brandID: values?.brandID,
            seriesID: values?.seriesID,
          })),
      });
    }
  }

  return (
    <>
      <Skeleton
        loading={isFetchingBrand || isFetchingSeries || isFetchingCategories}
        active
        paragraph={false}
        className={"grow w-full h-full mb-4"}
      >
        <div className={"py-4"}>
          <div className={"h-[calc(100vh-96px)] overflow-y-auto shadow-gray-500 p-4"}>
            <Table
              columns={columns}
              dataSource={rows.map((item: any) => ({
                key: item?.series,
                ...item,
              })) || []}
              pagination={false}
            />
          </div>
        </div>
      </Skeleton>
      <div className={"fixed z-10 top-20 left-4 flex flex-col justify-center gap-4"}>
        <div
          className={"flex items-center justify-center cursor-pointer shadow-gray-500 rounded transition-all hover:bg-red/20 p-2"}
          onClick={() => setVisible(!visible)}
        >
          <img src={menuIcon} alt={"menu"} className={"w-6 h-6"}/>
        </div>
      </div>
      <Sidebar
        visible={visible}
        setVisible={() => setVisible(false)}
      >
        <div className={"grid gap-4"}>
          <Button
            type={"primary"}
            className={"w-full !h-10 text-white !rounded-none"}
            disabled={seriesCreateMutate.isLoading}
            onClick={() => onSave("series")}
          >
            Сохранить серии
          </Button>
          <Button
            type={"primary"}
            className={"w-full !h-10 text-white !rounded-none"}
            disabled={categoryCreateMutate.isLoading}
            onClick={() => onSave("categories")}
          >
            Сохранить категории
          </Button>
        </div>
      </Sidebar>
    </>
  );
};

export default Processing;