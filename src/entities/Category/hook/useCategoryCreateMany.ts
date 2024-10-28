import {notification} from "antd";
import {useMutation} from "@tanstack/react-query";

import {categoryService} from "@/entities/Category/Category.module.ts";
import {getErrorMessage} from "@/shared/lib/getErrorMessage.ts";

export const useCategoryCreateMany = (onSuccess: (key: string, message?: string) => void) => {
  return useMutation({
    mutationFn: categoryService.createMany,
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