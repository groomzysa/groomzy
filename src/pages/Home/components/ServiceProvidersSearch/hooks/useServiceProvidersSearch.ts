import { useDispatch } from "react-redux";
import { setSearch } from "../../../../../store/slices/homeSlice/homeSlice";

export const useServiceProvidersSearch = () => {
  /**
   *
   * Hooks
   *
   */
  const dispatch = useDispatch();

  /**
   *
   * Handlers
   *
   */
  const onSearchChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    dispatch(setSearch({ search: value }));
  };

  const onSearchClear = () => {
    dispatch(setSearch({ search: undefined }));
  };

  return {
    onSearchChange,
    onSearchClear,
  };
};
