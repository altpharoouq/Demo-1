import { Outlet, useParams } from "react-router-dom";
import { useOffer } from "hooks/use-offers";

const Page = () => {
  const { offerId } = useParams();
  const { isFetching, data } = useOffer(offerId);

  return (
    <>
      <p className="text-center py-4">Offer page</p>

      {isFetching && <p className="text-center py-4">Fetching...</p>}

      <div className="flex flex-col items-center gap-1 py-4">
        {data && (
          <>
            <p>{data["provenirRequest.ApplicantDetails.fullName"]}</p>
            <p>{data["provenirRequest.GeneralInformation.applicationID"]}</p>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Page;
