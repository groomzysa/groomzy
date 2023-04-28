import { useEffect } from "react";
import { useFetchProviders } from "../../../api/hooks/queries";

export const useHomeExplorer = () => {
  const { fetchProviders, providers } = useFetchProviders();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return {
    hasProviders: (providers?.length || 0) > 0,
  };
};
