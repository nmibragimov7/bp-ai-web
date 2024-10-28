import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {seriesService} from "@/entities/Series/Series.module";
import {getErrorMessage} from "@/shared/lib/getErrorMessage";

export const useSeries = (params: Record<string, any>) => {
    return useQuery({
        queryKey: [seriesService.SERIES],
        select(response) {
            return response.data?.data || []
        },
        onError(error: any) {
            console.dir(error);
            notification.error({
                message: getErrorMessage(error),
            });
        },
        queryFn: () => {
            return seriesService.list(params);
        },
    });
}
