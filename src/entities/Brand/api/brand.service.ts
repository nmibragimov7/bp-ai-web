import {fetcher} from "@/shared/lib/axios";

const api = {
    list: "/v1/brands",
}

class BrandService {
    BRANDS = "brands";
    list(params: any = {}) {
        return fetcher.get(api.list, {
            params
        });
    }
}

export default new BrandService();
