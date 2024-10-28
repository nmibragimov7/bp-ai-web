import {useQuery} from "@tanstack/react-query";
import {notification} from "antd";

import {categoryService} from "@/entities/Category/Category.module.ts";
import {getErrorMessage} from "@/shared/lib/getErrorMessage.ts";

export const useCategories = (params: Record<string, any>) => {
  return useQuery({
    queryKey: [categoryService.CATEGORIES],
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
      return categoryService.list(params);
    },
  });
}