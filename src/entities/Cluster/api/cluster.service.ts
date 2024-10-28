import {fetcher} from "@/shared/lib/axios";

const api = {
  clusters: "/v2/clusters",
  download: "/v2/download",
}

class ClusterService {
  clusters(params: Record<string, any>) {
    return fetcher.get(api.clusters, {
      params: {...params}
    });
  }

  download(params: Record<string, string>) {
    return fetcher.get(api.download, {
      params: {...params},
      responseType: "blob",
    });
  }
}

export default new ClusterService();
