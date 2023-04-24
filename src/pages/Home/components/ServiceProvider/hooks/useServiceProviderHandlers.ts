import { useHistory } from "react-router";
import { routes } from "../../../../../route/routes";

export const useServiceProviderHandlers = () => {
  const history = useHistory();

  const navigateToProviderTrading = (id: string) => {
    history.push(`/${routes.providerTrading.base.use(id)}`);
  };

  return {
    navigateToProviderTrading,
  };
};
