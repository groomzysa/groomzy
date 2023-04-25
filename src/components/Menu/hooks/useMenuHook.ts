import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { storeToken } from "../../../api/helpers";
import { setToken } from "../../../store/slices/appSlice/appSlice";
import { includes } from "lodash";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { routes } from "../../../route/routes";

export const useMenuHook = () => {
  const [currentPageUrl, setCurrentpageUrl] = useState<string>();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPageUrl) {
      return;
    }

    if (includes(history.location.pathname, "home")) {
      setCurrentpageUrl(`/${routes.home.base.use()}`);
    } else {
      setCurrentpageUrl(`/${routes.providerDashboard.base.use()}`);
    }
  }, [history]);

  /**
   *
   * Handlers
   *
   */
  const signOutHandler = () => {
    storeToken("");
    dispatch(setToken({ token: undefined }));
    dispatch(api.util.invalidateTags(["User"]));

    history.push(`/${routes.home.base.use()}`);
  };

  const selectedPage = (pageUrl: string) => {
    return includes(history.location.pathname, pageUrl);
  };

  const onSetCurrentPageUrl = (pageUrl: string) => {
    setCurrentpageUrl(pageUrl);
  };

  return {
    currentPageUrl,
    signOutHandler,
    selectedPage,
    onSetCurrentPageUrl,
  };
};
