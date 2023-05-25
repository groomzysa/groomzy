import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { useCallback, useEffect, useState } from "react";

export const useNativeElementsSizeInfo = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboard = useCallback(() => {
    if (Capacitor.getPlatform() !== "web") {
      Keyboard.addListener("keyboardWillShow", (info) => {
        setKeyboardHeight(info.keyboardHeight);
        setIsKeyboardOpen(true);
      });

      Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardHeight(0);
        setIsKeyboardOpen(false);
      });
    }
  }, []);

  useEffect(() => {
    onKeyboard();
  }, [onKeyboard]);

  return {
    keyboardHeight,
    topToolBarHeight: 56,
    bottomToolBarHeight: 56,
    isKeyboardOpen,
  };
};
