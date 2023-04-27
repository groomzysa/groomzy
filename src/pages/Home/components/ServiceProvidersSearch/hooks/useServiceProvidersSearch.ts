import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../../../../store/slices/homeSlice/homeSlice";
import { RootState } from "../../../../../store/store";

export const useServiceProvidersSearch = () => {
  const {
    home: { search },
  } = useSelector<RootState, Pick<RootState, "home">>((state) => state);

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
    search,
    onSearchChange,
    onSearchClear,
  };
};
