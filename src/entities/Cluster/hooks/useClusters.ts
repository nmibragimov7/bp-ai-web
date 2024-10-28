import {useMutation} from "@tanstack/react-query";
import {notification} from "antd";

import {clusterService} from "@/entities/Cluster/Cluster.module.ts";

import {getErrorMessage} from "@/shared/lib/getErrorMessage.ts";

interface useClustersProps {
  onSuccess: (key: string, data: any) => void;
}

export const useClusters = ({onSuccess}: useClustersProps) => {
  return useMutation({
    mutationFn: clusterService.clusters,
    onSuccess(response: any) {
      onSuccess("cluster", response);
    },
    onError(error: any) {
      console.dir(error);
      notification.error({
        message: getErrorMessage(error),
      });
    },
  });
}