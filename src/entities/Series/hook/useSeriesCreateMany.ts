import {notification} from "antd";
import {useMutation} from "@tanstack/react-query";

import {getErrorMessage} from "@/shared/lib/getErrorMessage";
import {seriesService} from "@/entities/Series/Series.module";

export const useSeriesCreateMany = (onSuccess: (key: string, message?: string) => void) => {
    return useMutation({
        mutationFn: seriesService.createMany,
        onSuccess(response) {
            onSuccess("create-many", response.data?.message);
        },
        onError(error: any) {
            console.dir(error);
            notification.error({
                message: getErrorMessage(error),
            });
        },
    });
}