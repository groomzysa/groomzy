import { useContactMailMutation } from "../../graphql/mutations/mail/contactMail.enhanced";
import { getErrorMessage } from "../../helpers";

export const useContactMail = () => {
  const [contactMail, { data, isLoading, isSuccess, isError, error }] =
    useContactMailMutation();

  return {
    contactMail,
    contactedMail: data?.contactMail,
    contactMailLoading: isLoading,
    contactMailSuccess: isSuccess,
    contactMailHasError: isError,
    contactMailError: getErrorMessage(error),
  };
};
