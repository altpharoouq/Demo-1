import { useRouteError } from "react-router-dom";

const Page = () => {
  const error: any = useRouteError();

  return (
    <p className="text-center py-4">{error.statusText || error.message}</p>
  );
};

export default Page;
