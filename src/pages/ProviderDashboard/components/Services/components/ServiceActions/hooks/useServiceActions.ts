import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../../../../route/routes";

export const useServiceActions = () => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const history = useHistory();

  const onViewService = (id: string) => {
    setPopoverOpen(false);

    history.push(`/${routes.providerDashboard.services.viewService.use(id)}`);
  };

  const onUpdateService = (id: string) => {
    setPopoverOpen(false);

    history.push(`/${routes.providerDashboard.services.updateService.use(id)}`);
  };

  const onDeleteService = (id: string) => {
    setPopoverOpen(false);
    history.push(`/${routes.providerDashboard.services.deleteService.use(id)}`);
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
    onViewService,
    onUpdateService,
    onDeleteService,
  };
};
