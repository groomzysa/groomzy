import { useEffect, useState } from "react";
import { useFetchProvider } from "../../../../../api/hooks/queries";

export const useDetailsHandlers = () => {
  const [displayedContent, setDisplayedContent] = useState<string>("info");

  /**
   *
   * Hooks
   *
   */

  const {
    fetchProvider,
    provider,
    providerError,
    providerHasError,
    providerLoading,
  } = useFetchProvider();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    fetchProvider();
  }, [fetchProvider]);

  /**
   *
   * Handlers
   *
   */
  const onDisplayContentChanged = (content: string) => {
    setDisplayedContent(content);
  };

  return {
    provider,
    providerError,
    providerHasError,
    providerLoading,
    displayedContent,
    onDisplayContentChanged,
  };
};
