import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../../../../route/routes";

export const useStaffActions = () => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const history = useHistory();

  const onViewStaff = (id: string) => {
    setPopoverOpen(false);

    history.push(`/${routes.providerDashboard.staffs.viewStaff.use(id)}`);
  };

  const onUpdateStaff = (id: string) => {
    setPopoverOpen(false);

    history.push(`/${routes.providerDashboard.staffs.updateStaff.use(id)}`);
  };

  const onDeleteStaff = (id: string) => {
    setPopoverOpen(false);
    history.push(`/${routes.providerDashboard.staffs.deleteStaff.use(id)}`);
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
    onViewStaff,
    onUpdateStaff,
    onDeleteStaff,
  };
};
