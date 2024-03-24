import { inject } from "regexparam";

import type { GetReleaseRequestParams } from "@/lib/schema/api/releases/GetReleaseRequestParams";
import type { GetReleaseResponse } from "@/lib/schema/api/releases/GetReleaseResponse";

import type { DomainSpecificApiClientInterface } from "../../../lib/api/DomainSpecificApiClientInterface";
import { apiClient } from "../../../lib/api/apiClient";

type ReleaseApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetReleaseRequestParams }, GetReleaseResponse];
}>;

export const releaseApiClient: ReleaseApiClient = {
  fetch: async ({ params }) => {
    const response = await apiClient.get<GetReleaseResponse>(
      inject("/api/v1/releases/:dayOfWeek", params)
    );
    return response.data;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/releases/:dayOfWeek`,
    ...options,
  }),
};
