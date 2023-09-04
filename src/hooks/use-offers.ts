import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import flattenObject from "utils/flatten-object";
import client from "utils/api-client";

const offerList = async (data: OfferList["request"]) => {
  const params = new URLSearchParams({
    ..._.omitBy(data, _.isNil),
    perPage: "15",
  });

  return await client.get<OfferList["response"]>(
    "/decision-engine/v2/assessor-offers",
    {
      params,
    }
  );
};

const offer = async (offerId: string | undefined) => {
  return await flattenObject(
    (
      await client.get<Keyable>(`decision-engine/offer/${offerId}`)
    ).data
  );
};

export const useOfferList = (data: OfferList["request"]) => {
  return useQuery(
    [
      `offerList:${data.reviewStatus}:${data.bankingPartner}:${data.withErrors}:${data.query}:${data.page}`,
    ],
    () => offerList(data),
    {
      retry: false,
      refetchInterval: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useOffer = (offerId: string | undefined) => {
  return useQuery([`offer:${offerId}`], () => offer(offerId), {
    retry: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
