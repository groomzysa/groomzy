import { useDispatch } from "react-redux";
import { setSearch } from "../../../../../store/slices/homeSlice/homeSlice";
import { useState } from "react";

export const useServiceProvidersSearch = () => {
  const [searchTmp, setSearchTmp] = useState<string>();

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
    setSearchTmp(value);
    dispatch(setSearch({ search: value }));
  };

  const onSearchClear = () => {
    setSearchTmp(undefined);
    dispatch(setSearch({ search: undefined }));
  };

  return {
    searchTmp,
    onSearchChange,
    onSearchClear,
  };
};
