import { useParams } from "react-router-dom";
import { useOffer } from "hooks/use-offers";
import stripper from "utils/stripper";

const Page = () => {
  const { offerId } = useParams();
  const { data } = useOffer(offerId);

  const decisionSummary = stripper(data, [
    {
      label: "Final Credit Decision",
      target: "provenirResponse.Decision.finalCreditDecision",
      type: "text",
    },
    {
      label: "Application Data Validation Decision",
      target: "provenirResponse.Decision.dataValidationDecision",
      type: "text",
    },
    {
      label: "Client Eligibility Decision",
      target: "provenirResponse.Decision.clientEligibilityDecision",
      type: "text",
    },
    {
      label: "Client Credit Strategy Decision",
      target: "provenirResponse.Decision.clientCreditStrategyDecision",
      type: "text",
    },
    {
      label: "Client Affordability Decision",
      target: "provenirResponse.Decision.clientAffordabilityDecision",
      type: "text",
    },
    {
      label: "Vehicle Eligibility Decision",
      target: "provenirResponse.Decision.vehicleEligibilityDecision",
      type: "text",
    },
    {
      label: "Client Risk Grade",
      target: "provenirResponse.Decision.finalClientRiskGrade",
      type: "text",
    },
    {
      label: "Vehicle Risk Grade",
      target: "provenirResponse.Decision.vehicleRiskGrade",
      type: "text",
    },
    {
      label: "Document Validation Decision",
      target: "provenirResponse.Decision.documentValidationDecision",
      type: "text",
    },
    {
      label: "AML, PEPS and PIPS Decision",
      target: "provenirResponse.Decision.amlPEPSPIPSDecision",
      type: "text",
    },
    {
      label: "Age Decline Reasons",
      target: "provenirResponse.Decision.ageReasons",
      type: "text",
    },
    {
      label: "Score Decline Reasons",
      target: "provenirResponse.Decision.scoreReasons",
      type: "text",
    },
    {
      label: "Affordability Decline Reasons",
      target: "provenirResponse.Decision.affordabilityReasons",
      type: "text",
    },
    {
      label: "Vehicle Decline Reasons",
      target: "provenirResponse.Decision.vehicleReasons",
      type: "text",
    },
    {
      label: "Validation Decline Reasons",
      target: "provenirResponse.Decision.validationReasons",
      type: "text",
    },
    {
      label: "Other Decline Reasons",
      target: "provenirResponse.Decision.otherReasons",
      type: "text",
    },
  ]);

  const offerSummary = stripper(data, []);

  const generalInformation = stripper(data, []);

  return (
    <>
      {/* <p className="text-center py-4">
        {data["provenirRequest.ApplicantDetails.fullName"]} - Summary page
      </p> */}

      <div className="flex flex-col items-center gap-1 py-4">
        <h1>Decision Summary</h1>

        {decisionSummary.fields.map((x: any, index: number) => (
          <p>
            {decisionSummary.header[index].label} -{" "}
            <span className="text-blue-700">{x.value}</span>
          </p>
        ))}
      </div>

      <div className="py-4">
        <h1>Offer Summary</h1>
      </div>

      <div className="py-4">
        <h1>General Information</h1>
      </div>
    </>
  );
};

export default Page;
