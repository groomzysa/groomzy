import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteGallery as useDeleteGalleryMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { DELETED_GALLERY_MESSAGE } from "../../../../../../../utils/messages";
import { useSuccessControl } from "../../../../../../../hooks/useSuccessControl";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteGallery = (
  gridRef: React.RefObject<AgGridReact<any>>
) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [deleteGalleryLoading, setDeleteGalleryLoading] = useState(false);
  const gridApi = gridRef.current?.api;

  /**
   *
   * Hooks
   *
   */
  const { id } = useParams<{ id: string }>();

  const { successControl } = useSuccessControl();

  const { deleteGallery } = useDeleteGalleryMutation();

  const history = useHistory();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!id) {
      history.push(`/${routes.providerDashboard.gallery.use()}`);

      return;
    }

    setIsOpen(true);

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [id, history]);

  /**
   *
   * Handlers
   *
   */

  const onDeleteGallery = async () => {
    setDeleteGalleryLoading(true);
    try {
      await deleteGallery({
        galleryId: Number(id),
      }).unwrap();

      setDeleteGalleryLoading(false);

      successControl(DELETED_GALLERY_MESSAGE, onCloseModal);
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setDeleteGalleryLoading(false);
      successControl(
        getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting gallery image."
      );
    }
  };

  function onCloseModal() {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.gallery.use()}`);
  }

  return {
    isOpen,
    deleteGalleryLoading,
    onDeleteGallery,
    onCloseModal,
  };
};
