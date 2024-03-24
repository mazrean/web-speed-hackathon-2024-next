import { inject } from "regexparam";

import type { GetEpisodeListRequestQuery } from "@/lib/schema/api/episodes/GetEpisodeListRequestQuery";
import type { GetEpisodeListResponse } from "@/lib/schema/api/episodes/GetEpisodeListResponse";
import type { GetEpisodeRequestParams } from "@/lib/schema/api/episodes/GetEpisodeRequestParams";
import type { GetEpisodeResponse } from "@/lib/schema/api/episodes/GetEpisodeResponse";

import type { DomainSpecificApiClientInterface } from "../../../lib/api/DomainSpecificApiClientInterface";
import { apiClient } from "../../../lib/api/apiClient";

type EpisodeApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetEpisodeRequestParams }, GetEpisodeResponse];
  fetchList: [{ query: GetEpisodeListRequestQuery }, GetEpisodeListResponse];
}>;

export const episodeApiClient: EpisodeApiClient = {
  fetch: async ({ params }) => {
    const response = await apiClient.get<GetEpisodeResponse>(
      inject("/api/v1/episodes/:episodeId", params)
    );
    return response.data;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/episodes/:episodeId`,
    ...options,
  }),
  fetchList: async ({ query }) => {
    const response = await apiClient.get<GetEpisodeListResponse>(
      inject("/api/v1/episodes", {}),
      {
        params: query,
      }
    );
    return response.data;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/episodes`,
    ...options,
  }),
};
