import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../api/helpers";
import { useFetchUser } from "../api/hooks/queries";

export const useAppHandlers = () => {
  const dispatch = useDispatch();
  const token = getToken();

  /**
   *
   * Hooks
   *
   */
  const {
    fetchUser,
    user,
    userIsLoading,
    userIsUninitialized,
    userIsFetching,
  } = useFetchUser();

  const userLoading = userIsFetching || userIsUninitialized || userIsLoading;

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    fetchUser();
  }, [dispatch, fetchUser]);

  return {
    token,
    user,
    userLoading,
  };
};
