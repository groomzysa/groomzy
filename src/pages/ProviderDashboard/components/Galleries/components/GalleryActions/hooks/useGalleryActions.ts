import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../../../../route/routes";

export const useGalleryActions = () => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const history = useHistory();

  const onViewGallery = (id: string) => {
    setPopoverOpen(false);

    history.push(`/${routes.providerDashboard.gallery.viewGallery.use(id)}`);
  };

  const onUpdateGallery = (id: string) => {
    setPopoverOpen(false);

    history.push(`/${routes.providerDashboard.gallery.updateGallery.use(id)}`);
  };

  const onDeleteGallery = (id: string) => {
    setPopoverOpen(false);
    history.push(`/${routes.providerDashboard.gallery.deleteGallery.use(id)}`);
  };

  const onOpenPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const onClosePopover = () => {
    setPopoverOpen(false);
  };

  return {
    popoverOpen,
    popover,
    onOpenPopover,
    onClosePopover,
    onViewGallery,
    onUpdateGallery,
    onDeleteGallery,
  };
};
