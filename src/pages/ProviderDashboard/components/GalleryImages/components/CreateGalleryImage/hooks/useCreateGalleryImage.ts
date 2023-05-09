import { AgGridReact } from "ag-grid-react";
import { isEmpty } from "lodash";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useCreateGallery as useCreateGalleryImageMutation } from "../../../../../../../api/hooks/mutations";
import { routes } from "../../../../../../../route/routes";
import { CREATE_GALLERY_MESSAGE } from "../../../../../../../utils/messages";
import { IInput, IPhoto } from "../../../../../../../utils/types";
import { useCustomToast } from "../../../../../../../hooks/useCustomToast";
import { getErrorMessage } from "../../../../../../../api/helpers";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const useCreateGalleryImage = (gridRef: RefObject<AgGridReact<any>>) => {
  const [name, setName] = useState<IInput<string>>();
  const [photo, setPhoto] = useState<IPhoto>();
  const [galleryImage, setGalleryImage] = useState<Blob>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [createGalleryLoading, setCreateGalleryLoading] = useState(false);

  const history = useHistory();
  const gridApi = gridRef.current?.api;

  /**
   *
   * Hooks
   *
   */
  const { autoDisimissToast } = useCustomToast();

  const { createGallery } = useCreateGalleryImageMutation();

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
    history.push(`/${routes.providerDashboard.gallery.use()}`);
  }, [history, setIsOpen]);

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    setIsOpen(true);

    return history.listen(() => {
      if (history.action === "PUSH" || history.action === "POP") {
        setIsOpen(false);
      }
    });
  }, [history]);

  /**
   *
   * Handlers
   *
   */
  const onInputCheckUpdate = (
    value: string,
    error: string,
    setValue: Dispatch<SetStateAction<IInput<any> | undefined>>
  ) => {
    if (!value) {
      setValue({ value, error });
    } else {
      setValue({ value, error: "" });
    }
  };

  const onNameChange = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    onInputCheckUpdate(value, "Name is required.", setName);
  };

  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const newPhoto = {
      filepath: new Date() + "." + photo.format,
      webviewPath: photo.webPath,
    };

    const base64Data = await base64FromPath(photo.webPath!);

    const response = await fetch(base64Data);
    const blob = await response.blob();
    setPhoto(newPhoto);
    setGalleryImage(blob);
  };

  const onCanCreateGallery = (): boolean => {
    const error = !isEmpty(name?.error);
    const missingFilled = isEmpty(name?.value) || isEmpty(photo);

    return !error && !missingFilled;
  };

  const onCreateGallery = async () => {
    if (!onCanCreateGallery()) {
      return;
    }

    setCreateGalleryLoading(true);

    try {
      await createGallery({
        name: name!.value,
        galleryImage: galleryImage,
      }).unwrap();

      setCreateGalleryLoading(false);

      autoDisimissToast({ message: CREATE_GALLERY_MESSAGE, onCloseModal });
      gridApi?.purgeInfiniteCache();
    } catch (error) {
      setCreateGalleryLoading(false);
      autoDisimissToast({
        message:
          getErrorMessage(error as ErrorResponse) ||
          "Something went wrong creating gallery image.",
        buttonDismiss: true,
      });
    }
  };

  return {
    name,
    createGalleryLoading,
    isOpen,
    photo,
    takePhoto,
    onNameChange,
    onCreateGallery,
    onCloseModal,
    onCanCreateGallery,
  };
};
