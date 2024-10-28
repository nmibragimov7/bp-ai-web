import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {brandService} from "@/entities/Brand/Brand.module";
import {getErrorMessage} from "@/shared/lib/getErrorMessage";

export const useBrands = (params: Record<string, any>) => {
    return useQuery({
        queryKey: [brandService.BRANDS],
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
            return brandService.list(params);
        },
    });
}
