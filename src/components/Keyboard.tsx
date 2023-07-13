import Keypad from "./Keypad";

interface KeyboardProps {
  handleKeypadRotor: (s: string) => void;
}
const Keyboard = ({ handleKeypadRotor }: KeyboardProps) => {
  const top = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const mid = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottom = ["Z", "X", "C", "V", "B", "N", "M"];
  return (
    <div className="flex flex-col justify-center items-center gap-1 p-1 sm:gap-3 sm:p-3 bg-slate-600 rounded-md">
      <div className="flex flex-row gap-1 sm:gap-3">
        {top.map((char) => (
          <Keypad
            char={char}
            key={char}
            handleKeypadRotor={handleKeypadRotor}
          />
        ))}
      </div>
      <div className="flex flex-row gap-1 sm:gap-3">
        {mid.map((char) => (
          <Keypad
            char={char}
            key={char}
            handleKeypadRotor={handleKeypadRotor}
          />
        ))}
      </div>
      <div className="flex flex-row gap-1 sm:gap-3">
        {bottom.map((char) => (
          <Keypad
            char={char}
            key={char}
            handleKeypadRotor={handleKeypadRotor}
          />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
