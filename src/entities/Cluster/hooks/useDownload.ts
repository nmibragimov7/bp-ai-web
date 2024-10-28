import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {clusterService} from "@/entities/Cluster/Cluster.module.ts";

import {getErrorMessage} from "@/shared/lib/getErrorMessage.ts";

interface useDownloadProps {
  onSuccess: (key: string, data: any) => void;
}

export const useDownload = ({onSuccess}: useDownloadProps) => {
  return useMutation({
    mutationFn: clusterService.download,
    onSuccess(response: any) {
      onSuccess("download", response);
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}