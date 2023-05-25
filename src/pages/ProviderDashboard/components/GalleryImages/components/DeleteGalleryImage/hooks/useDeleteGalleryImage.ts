import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteGallery as useDeleteGalleryImageMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { DELETED_GALLERY_MESSAGE } from "../../../../../../../utils/messages";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";

export const useDeleteGalleryImage = (
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

  const { toast } = useCustomToast();

  const { deleteGallery } = useDeleteGalleryImageMutation();

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

      toast({ message: DELETED_GALLERY_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setDeleteGalleryLoading(false);
      toast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong deleting gallery image.",
        buttonDismiss: true,
      });
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
