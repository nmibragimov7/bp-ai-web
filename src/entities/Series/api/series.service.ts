import {fetcher} from "@/shared/lib/axios";

const api = {
    list: "/v1/series",
}

class SeriesService {
    SERIES = "series";
    list(params: any = {}) {
        return fetcher.get(api.list, {
            params
        });
    }
    createMany(data: any) {
        return fetcher.post(api.list+"/many", data);
    }
}

export default new SeriesService();
