import { useEffect, useState } from "react";

// import { useEffect } from "react";
interface KeypadProps {
  char: string;
  handleKeypadRotor: (s: string) => void;
}

const Keypad = ({ char, handleKeypadRotor }: KeypadProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === char.toLowerCase() || event.key === char) {
        const audio = new Audio("/keypad.mp3");
        audio.play();
        handleKeypadRotor(char);
        setIsActive(true);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === char.toLowerCase() || event.key === char) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [char]);

  const onClick = () => {
    const audio = new Audio("/keypad.mp3");
    audio.play();
    handleKeypadRotor(char);
  };
  return (
    <button
      className={`${
        isActive ? "bg-gray-500" : "bg-black"
      } w-[30px] sm:w-[40px] aspect-square bg-black text-[16px] sm:text-[20px] font-medium rounded-md hover:bg-gray-800 active:bg-gray-500 select-none transition-all`}
      onClick={onClick}
    >
      {char}
    </button>
  );
};

export default Keypad;
