/**
 *
 * User mutations
 *
 */
export { useAddUser } from "./user/useAddUser";
export { useSignIn } from "./user/useSignIn";
export { useUpdateAccount } from "./user/useUpdateAccount";
export { useAddAccountAddress } from "./user/useAddAccountAddress";
export { useUpdateAccountAddress } from "./user/useUpdateAccountAddress";
export { useRequestPasswordReset } from "./user/useRequestPasswordReset";
export { useResetPassword } from "./user/useResetPassword";

/**
 *
 * Provider mutations
 *
 */
export { useAddTradingInfo } from "./provider/useAddTradingInfo";
export { useUpdateTradingInfo } from "./provider/useUpdateTradingInfo";
export { useAddTradingAddress } from "./provider/useAddTradingAddress";
export { useUpdateTradingAddress } from "./provider/useUpdateTradingAddress";

/**
 *
 * Service mutations
 *
 */
export { useCreateService as useAddService } from "./service/useAddService";
export { useUpdateService } from "./service/useUpdateService";
export { useDeleteService } from "./service/useDeleteService";

/**
 *
 * Operating time mutations
 *
 */
export { useAddOperatingTime } from "./operatingTimes/useAddOperatingTime";
export { useDeleteOperatingTime } from "./operatingTimes/useDeleteOperatingTime";
export { useUpdateOperatingTime } from "./operatingTimes/useUpdateOperatingTime";

/**
 *
 * Staff mutations
 *
 */
export { useCreateStaff } from "./staff/useAddStaff";
export { useDeleteStaff } from "./staff/useDeleteStaff";
export { useUpdateStaff } from "./staff/useUpdateStaff";

/**
 *
 * Social mutations
 *
 */
export { useAddSocial } from "./social/useAddSocial";
export { useDeleteSocial } from "./social/useDeleteSocial";
export { useUpdateSocial } from "./social/useUpdateSocial";

/**
 *
 * Gallery mutations
 *
 */
export { useCreateGallery } from "./gallery/useAddGallery";
export { useUpdateGallery } from "./gallery/useUpdateGallery";
export { useDeleteGallery } from "./gallery/useDeleteGallery";

/**
 *
 * Contact mail mutations
 *
 */
export { useContactMail } from "./useContactMail";
