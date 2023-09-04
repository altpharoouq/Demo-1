import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
}

const Redirect = ({ path }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [path, navigate]);

  return <></>;
};

export default Redirect;
