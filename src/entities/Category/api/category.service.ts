import {fetcher} from "@/shared/lib/axios";

const api = {
    list: "/v1/categories",
}

class CategoryService {
    CATEGORIES = "categories";
    list(params: any = {}) {
        return fetcher.get(api.list, {
            params
        });
    }
    createMany(data: any) {
        return fetcher.post(api.list+"/many", data);
    }
}

export default new CategoryService();
