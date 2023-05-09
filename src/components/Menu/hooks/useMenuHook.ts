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

  /**
   *
   * Hooks
   *
   */
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (currentPageUrl) {
      return;
    }

    if (includes(history.location.pathname, "home")) {
      setCurrentpageUrl(`/${routes.home.base.use()}`);
    } else {
      setCurrentpageUrl(`/${routes.providerDashboard.base.use()}`);
    }

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        if (includes(history.location.pathname, "home")) {
          setCurrentpageUrl(`/${routes.home.base.use()}`);
        } else if (includes(history.location.pathname, "provider-dashboard")) {
          setCurrentpageUrl(`/${routes.providerDashboard.base.use()}`);
        } else {
          console.log(history.location.pathname);
          setCurrentpageUrl(`/${history.location.pathname}`);
        }
      }
    });
  }, [history, currentPageUrl]);

  useEffect(() => {
    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        if (includes(history.location.pathname, "home")) {
          setCurrentpageUrl(`/${routes.home.base.use()}`);
        } else if (includes(history.location.pathname, "provider-dashboard")) {
          setCurrentpageUrl(`/${routes.providerDashboard.base.use()}`);
        } else {
          setCurrentpageUrl(`/${history.location.pathname}`);
        }
      }
    });
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
