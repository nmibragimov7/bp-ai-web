import {useState} from "react";
import {Modal} from "antd";

import ScatterChart from "@/features/ScatterChart/ScatterChart.tsx";
import Sidebar from "@/widgets/Sidebar/Sidebar.tsx";
import Control from "@/features/Control/Control.tsx";
import Loader from "@/shared/ui/Loader/Loader.tsx";
import Filter from "@/features/Filter/Filter.tsx";

import {useClusters, useDownload} from "@/entities/Cluster/Cluster.module.ts";

import {formatDate} from "@/shared/lib/date.ts";

import {TFilter} from "@/shared/types";

const phones = `
Nothing Phone 2 256GB
Nothing Phone 2 512GB
Nothing Phone 1 256GB
Nothing Phone 1 128GB
Nothing Phone 1 128GB
Nothing Phone 1 256GB
Nothing Phone 2A 128GB
Nothing Phone 2A 256GB
Nothing Phone 2 256GB
Nothing Phone 2 512GB
`

const Main = () => {
  console.log(new Set(phones.split("\n").filter(Boolean)))
  const [data, setData] = useState<any>(null);
  const [idx, setIdx] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  const onSuccess = (key: string, response: any) => {
    if (key === "cluster") {
      setVisible(false);
      setData(response);
    }

    if (key === "download") {
      try {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", `${data?.data?.uuid}.xlsx`); // Название файла

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.dir(error);
      }
    }
  }

  const clusterMutate = useClusters({onSuccess});
  const downloadMutate = useDownload({onSuccess});

  const onFinish = (values: TFilter) => {
    setData(null);
    clusterMutate.mutate({
      ...values,
      date: formatDate(new Date(values.date).toISOString(), "yyyy-MM-dd"),
    });
  }
  const onClick = (index: string) => {
    if (!index) return;

    if (!data?.data?.result || !data?.data?.result?.[index]) return;

    setToggle(true);
    setIdx(index);
  }
  const onDownload = () => {
    if (!data?.data?.uuid || downloadMutate.isLoading) return;

    downloadMutate.mutate({
      uuid: data?.data?.uuid,
    });
  }

  return (
    <>
      <div className={"grow flex flex-col"}>
        {clusterMutate.isLoading ? (
          <div className={"grow flex flex-col items-center justify-center text-center py-4"}>
            <p>Идет процесс кластеризации...</p>
            <p>Идет обработка данных для формирования кластеров. Пожалуйста, оставайтесь на странице для завершения процесса.</p>
            <Loader className={"!w-5 !h-5 !text-primary !mt-8"}/>
          </div>
        ) : (
          <>
            {!data ? (
              <div className={"grow flex flex-col items-center justify-center text-center py-4"}>
                <p>Необходимо настроить фильтры для кластеризации...</p>
              </div>
            ) : (
              <div className={"grow w-full flex flex-col"}>
                <ScatterChart
                  centroids={data?.data?.data?.centroids || []}
                  descriptions={data?.data?.descriptions || {}}
                  result={data?.data?.result || {}}
                  onClick={onClick}
                />
              </div>
            )}
          </>
        )}
      </div>
      <Control
        visible={visible}
        isLoading={downloadMutate.isLoading}
        setVisible={setVisible}
        onClick={onDownload}
      />
      <Sidebar
        visible={visible}
        setVisible={() => setVisible(false)}
      >
        <Filter isLoading={clusterMutate.isLoading} onFinish={onFinish}/>
      </Sidebar>
      {toggle ? (
        <Modal
          open={toggle}
          footer={null}
          onCancel={() => {
            setToggle(false);
            setIdx("");
          }}
        >
          <div className={"w-auto md:w-[360px]"}>
            <p className={"text-lg text-center font-semibold mb-4"}>{data?.data?.descriptions?.[idx]}</p>
            {data?.data?.result?.[idx].map((item: string, idx: number) => (
              <p key={idx} className={"mb-1"}>{item}</p>
            ))}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Main;