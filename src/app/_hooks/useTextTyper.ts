import { useEffect, useState } from "react";

export const typingSpeeds = {
  slow: 100,
  medium: 50,
  fast: 25,
};

const useTextTyper = (text: string, speed: number) => {
  const [typingStarted, setTypingStarted] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typingStarted && currentText.length < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentText.length]);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typingStarted, currentText, text, speed]);

  const startTyping = () => setTypingStarted(true);

  return { currentText, startTyping };
};

export default useTextTyper;
