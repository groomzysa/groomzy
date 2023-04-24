import { useState } from "react";

export const useAccount = () => {
  const [displayedContent, setDisplayedContent] = useState<string>("info");

  /**
   *
   * Handlers
   *
   */
  const onDisplayContentChanged = (content: string) => {
    setDisplayedContent(content);
  };

  return {
    displayedContent,
    onDisplayContentChanged,
  };
};
