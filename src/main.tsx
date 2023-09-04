import "styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Offers from "pages/offers/main";
import OfferById from "pages/offers/[id]";
import OfferById_Summary from "pages/offers/[id]/summary";
import ReassignDeals from "pages/reassign-deals";
import AssessorReports from "pages/assessor-reports";
import TableConfigurator from "pages/table-configurator";
import Redirect from "pages/xoxo/redirect";
import Error from "pages/xoxo/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirect path="/offers" />,
    errorElement: <Error />,
  },
  {
    path: "/offers",
    element: <Offers />,
  },
  {
    path: "/offers/:offerId",
    element: <OfferById />,
    children: [
      {
        path: "/offers/:offerId/summary",
        // eslint-disable-next-line
        element: <OfferById_Summary />,
      },
    ],
  },
  {
    path: "/reassign-deals",
    element: <ReassignDeals />,
  },
  {
    path: "/assessor-reports",
    element: <AssessorReports />,
  },
  {
    path: "/table-configurator",
    element: <TableConfigurator />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
