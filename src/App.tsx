import { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Keylamp from "./components/Keylamp";
import RotorSetting from "./components/RotorSetting";
import {
  ETW,
  Rotor1,
  Rotor2,
  Rotor3,
  Rotor4,
  Rotor5,
  UKWB,
} from "./algorithm/Constant";
import {
  CharToInt,
  IntToChar,
  ReverseMap,
  ShiftInt,
} from "./algorithm/HelperFunction";
import Output from "./components/Output";

interface Rotor {
  rotorMap: Map<number, number>;
  turnover: number;
  currentPosition: number;
}

const App = () => {
  // CONST
  const [leftRotor, setLeftRotor] = useState<Rotor>(Rotor5());
  const [midRotor, setMidRotor] = useState<Rotor>(Rotor2());
  const [rightRotor, setRightRotor] = useState<Rotor>(Rotor4());
  const reflector: Map<number, number> = UKWB();
  const entryDisc: Map<number, number> = ETW();
  const [selectedChar, setSelectedChar] = useState("");
  const [activeLamp, setActiveLamp] = useState("");
  const [longInput, setLongInput] = useState("");
  const [longOutput, setLongOutput] = useState("");

  // HOOKS
  useEffect(() => {
    if (selectedChar !== "") encrypt(selectedChar);
  }, [leftRotor, midRotor, rightRotor, selectedChar]);

  // FUNCTION
  const handleKeypadRotor = (s: string) => {
    // Called when a keypad is pressed
    if (rightRotor.currentPosition === rightRotor.turnover) {
      if (midRotor.currentPosition === midRotor.turnover) {
        setLeftRotor({
          ...leftRotor,
          currentPosition: ShiftInt(leftRotor.currentPosition, 1),
        });
      }
      setMidRotor({
        ...midRotor,
        currentPosition: ShiftInt(midRotor.currentPosition, 1),
      });
    }
    setRightRotor({
      ...rightRotor,
      currentPosition: ShiftInt(rightRotor.currentPosition, 1),
    });
    setSelectedChar(s);
    const newLongInput = longInput + s;
    setLongInput(newLongInput);
  };

  const encrypt = (s: string) => {
    let numStr = CharToInt(s);
    console.log(
      "Rotor Position: ",
      IntToChar(leftRotor.currentPosition),
      IntToChar(midRotor.currentPosition),
      IntToChar(rightRotor.currentPosition)
    );

    // PLUGBOARD
    // tambahin nanti

    // ENTRY DISC
    numStr = entryDisc.get(numStr)!;

    // RIGHT WHEELS
    numStr = ShiftInt(
      rightRotor.rotorMap.get(
        ShiftInt(numStr, rightRotor.currentPosition - 1)
      )!,
      -rightRotor.currentPosition + 1
    );
    console.log("R1: ", IntToChar(numStr));

    // MIDDLE WHEELS
    numStr = ShiftInt(
      midRotor.rotorMap.get(ShiftInt(numStr, midRotor.currentPosition - 1))!,
      -midRotor.currentPosition + 1
    );
    console.log("M1: ", IntToChar(numStr));

    // LEFT WHEELS
    numStr = ShiftInt(
      leftRotor.rotorMap.get(ShiftInt(numStr, leftRotor.currentPosition - 1))!,
      -leftRotor.currentPosition + 1
    );
    console.log("L1", IntToChar(numStr));

    // REFLECTOR
    numStr = reflector.get(ShiftInt(numStr, leftRotor.currentPosition - 1))!;
    console.log("Ref", IntToChar(numStr));

    // LEFT WHEELS
    numStr = ShiftInt(
      ReverseMap(
        leftRotor.rotorMap,
        ShiftInt(numStr, leftRotor.currentPosition - 1)
      ),
      -leftRotor.currentPosition + 1
    );
    console.log("L2", IntToChar(numStr));

    // MIDDLE WHEELS
    numStr = ShiftInt(
      ReverseMap(
        midRotor.rotorMap,
        ShiftInt(numStr, midRotor.currentPosition - 1)
      ),
      -midRotor.currentPosition + 1
    );
    console.log("M2", IntToChar(numStr));

    // RIGHT WHEELS
    numStr = ShiftInt(
      ReverseMap(
        rightRotor.rotorMap,
        ShiftInt(numStr, rightRotor.currentPosition - 1)
      ),
      -rightRotor.currentPosition + 1
    );
    console.log("R2", IntToChar(numStr));

    // ENTRY DISC
    numStr = entryDisc.get(numStr)!;
    // PLUGBOARD
    // tambahin nanti

    const answer = IntToChar(numStr);
    setActiveLamp(answer);
    const newLongOutput = longOutput + answer;
    setLongOutput(newLongOutput);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-black text-white font-inter gap-5">
      <div className="sm:text-[36px] font-medium">ENIGMA M3 SIMULATOR</div>
      {/* ROTORS */}
      <RotorSetting
        leftRotor={leftRotor!}
        midRotor={midRotor!}
        rightRotor={rightRotor!}
      />
      {/* LAMPS */}
      <Keylamp activeChar={activeLamp} />
      {/* KEYBOARDS */}
      <Keyboard handleKeypadRotor={handleKeypadRotor} />
      {/* OUTPUT */}
      <Output input={longInput} output={longOutput} />
    </div>
  );
};

export default App;
