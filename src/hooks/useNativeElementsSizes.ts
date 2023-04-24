import { useKeyboard } from "@capacitor-community/keyboard-react";

export const useNativeElementsSizeInfo = () => {
  const { isOpen, keyboardHeight, isAvailable } = useKeyboard();

  return {
    keyboardHeight: isAvailable ? keyboardHeight : 0,
    topToolBarHeight: 56,
    bottomToolBarHeight: 56,
    isKeyboardOpen: isAvailable ? isOpen : false,
  };
};
