import { inject } from "regexparam";

import type { GetRankingListRequestQuery } from "@/lib/schema/api/rankings/GetRankingListRequestQuery";
import type { GetRankingListResponse } from "@/lib/schema/api/rankings/GetRankingListResponse";

import type { DomainSpecificApiClientInterface } from "@/lib/api/DomainSpecificApiClientInterface";
import { apiClient } from "@/lib/api/apiClient";

type RankingApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetRankingListRequestQuery }, GetRankingListResponse];
}>;

export const rankingApiClient: RankingApiClient = {
  fetchList: async ({ query }) => {
    const response = await apiClient.get<GetRankingListResponse>(
      inject("/api/v1/rankings", {}),
      {
        params: query,
      }
    );
    return response.data;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/rankings`,
    ...options,
  }),
};
