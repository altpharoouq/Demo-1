import { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { useOfferList } from "hooks/use-offers";
import bankingPartnerState from "states/banking-partner";
import bankingPartners from "constants/banking-partners.json";
import offerStatuses from "constants/offer-statuses.json";

const Page = () => {
  const [partner, setPartner] = bankingPartnerState(
    (state) => [state.partner, state.setPartner],
    shallow
  );
  const [params, setParams] = useSearchParams();

  const page = params.get("page") || "1";

  const query = params.get("query") || "";
  const delayedQuery = useDebounce(query, 500);

  const withErrors = Boolean(params.get("with_errors"));
  const [isWithErrorsChecked, setIsWithErrorsChecked] = useState(withErrors);

  const bankingPartner = params.get("banking_partner") || partner;
  const reviewStatus = params.get("review_status") || offerStatuses[0].value;

  useEffect(() => {
    document.title = "Offers - Underwriter UI";

    query.length > 0 ? params.set("query", query) : params.delete("query");
    isWithErrorsChecked
      ? params.set("with_errors", "true")
      : params.delete("with_errors");
    params.set("page", page);
    params.set("banking_partner", bankingPartner);
    params.set("review_status", reviewStatus);

    setPartner(bankingPartner);
    setParams(params);
  }, [
    bankingPartner,
    reviewStatus,
    page,
    query,
    params,
    isWithErrorsChecked,
    setPartner,
    setParams,
  ]);

  useEffect(() => {
    if (page === "1") {
      params.delete("page");
      setParams(params);
    }
  }, [page, params, setParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    params.set(name, value);
    setParams(params);
  };

  const handlePageChange = (page: number) => {
    params.set("page", page.toString());
    setParams(params);
  };

  const clearFilterParams = () => {
    params.delete("query");

    setIsWithErrorsChecked(false);
    params.set("banking_partner", bankingPartners[0].value);
    params.set("review_status", offerStatuses[0].value);
    setParams(params);
  };

  const handleWithErrorChange = () => {
    setIsWithErrorsChecked(!isWithErrorsChecked);
  };

  const { isFetching, data } = useOfferList({
    country: "NG",
    assessorEmail: "developers@autochek.africa",
    reviewStatus,
    bankingPartner,
    query: delayedQuery,
    withErrors: isWithErrorsChecked,
    page,
  });

  return (
    <>
      <p className="text-center py-4">Offers List</p>

      <div className="flex flex-row justify-center gap-2">
        <select
          name="banking_partner"
          className="border"
          onChange={handleInputChange}
          value={bankingPartner}
        >
          {bankingPartners.map((x, index) => (
            <option key={index} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
        <select
          name="review_status"
          className="border"
          onChange={handleInputChange}
          value={reviewStatus}
        >
          {offerStatuses.map((x, index) => (
            <option key={index} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Load ID/Name"
          name="query"
          className="border"
          onChange={handleInputChange}
          value={query}
        />
        <input
          type="checkbox"
          name="with_errors"
          className="border"
          onChange={handleWithErrorChange}
          checked={isWithErrorsChecked}
        />
        With errors
        <input
          type="button"
          className="border px-1"
          onClick={() => clearFilterParams()}
          value="Clear Filters"
        />
      </div>

      {isFetching && <p className="text-center py-4">Fetching...</p>}

      <div className="flex flex-col items-center gap-1 py-4">
        {data?.data.offers.map((x) => (
          <div key={x.id}>
            <Link to={`/offers/${x.id}`}>{x.fullName}</Link>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-center gap-3 cursor-pointer">
        {Array(Math.ceil(Number(data?.data.total || 0) / 10))
          .fill(null)
          .map((_x, index) => (
            <p
              className={page === String(index + 1) ? "underline" : "unset"}
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </p>
          ))}
      </div>
    </>
  );
};

export default Page;
