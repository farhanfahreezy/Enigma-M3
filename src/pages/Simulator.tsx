import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";
import Keylamp from "../components/Keylamp";
import RotorSetting from "../components/RotorSetting";
import {
  ETW,
  Rotor1,
  Rotor2,
  Rotor3,
  Rotor4,
  Rotor5,
  UKWB,
} from "../algorithm/Constant";
import {
  CharToInt,
  IntToChar,
  ReverseMap,
  ShiftInt,
} from "../algorithm/HelperFunction";
import Output from "../components/Output";
import Step from "../components/Step";
import Plugboard from "../components/Plugboard";

interface Rotor {
  rotorMap: Map<number, number>;
  turnover: number;
  currentPosition: number;
}

const Simulator = () => {
  // CONST
  const [leftRotor, setLeftRotor] = useState<Rotor>(Rotor1());
  const [midRotor, setMidRotor] = useState<Rotor>(Rotor2());
  const [rightRotor, setRightRotor] = useState<Rotor>(Rotor3());
  const reflector: Map<number, number> = UKWB();
  const entryDisc: Map<number, number> = ETW();
  const [plugboard, setPlugbloard] = useState<Map<number, number>>(
    new Map<number, number>()
  );
  const [selectedChar, setSelectedChar] = useState("");
  const [activeLamp, setActiveLamp] = useState("");
  const [longInput, setLongInput] = useState("");
  const [longOutput, setLongOutput] = useState("");
  const [stepOutput, setStepOutput] = useState<string[]>([]);

  // HOOKS
  useEffect(() => {
    if (selectedChar !== "") {
      encrypt(selectedChar);
      setSelectedChar("");
    }
  }, [leftRotor, midRotor, rightRotor, selectedChar]);

  // FUNCTION
  const handleKeypadRotor = (s: string) => {
    setSelectedChar(s);
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

    const newLongInput = longInput + s;
    setLongInput(newLongInput);
  };

  const encrypt = (s: string) => {
    let outputStr = "Keyboard Input : " + s + "\n";

    let numStr = CharToInt(s);

    outputStr +=
      "Rotor Position : " +
      IntToChar(leftRotor.currentPosition) +
      IntToChar(midRotor.currentPosition) +
      IntToChar(rightRotor.currentPosition) +
      "\n";

    // ENTRY DISC
    numStr = entryDisc.get(numStr)!;

    // PLUGBOARD
    if (plugboard.has(numStr)) {
      numStr = plugboard.get(numStr)!;
    }
    outputStr += "Plugboard In : " + IntToChar(numStr) + "\n";

    // RIGHT WHEELS
    numStr = ShiftInt(
      rightRotor.rotorMap.get(
        ShiftInt(numStr, rightRotor.currentPosition - 1)
      )!,
      -rightRotor.currentPosition + 1
    );
    outputStr += "Right Wheel 1  : " + IntToChar(numStr) + "\n";

    // MIDDLE WHEELS
    numStr = ShiftInt(
      midRotor.rotorMap.get(ShiftInt(numStr, midRotor.currentPosition - 1))!,
      -midRotor.currentPosition + 1
    );
    outputStr += "Middle Wheel 1 : " + IntToChar(numStr) + "\n";

    // LEFT WHEELS
    numStr = ShiftInt(
      leftRotor.rotorMap.get(ShiftInt(numStr, leftRotor.currentPosition - 1))!,
      -leftRotor.currentPosition + 1
    );
    outputStr += "Left Wheel 1   : " + IntToChar(numStr) + "\n";

    // REFLECTOR
    numStr = reflector.get(numStr)!;
    outputStr += "Reflection   : " + IntToChar(numStr) + "\n";

    // LEFT WHEELS
    numStr = ShiftInt(
      ReverseMap(
        leftRotor.rotorMap,
        ShiftInt(numStr, leftRotor.currentPosition - 1)
      ),
      -leftRotor.currentPosition + 1
    );
    outputStr += "Left Wheel 2   : " + IntToChar(numStr) + "\n";

    // MIDDLE WHEELS
    numStr = ShiftInt(
      ReverseMap(
        midRotor.rotorMap,
        ShiftInt(numStr, midRotor.currentPosition - 1)
      ),
      -midRotor.currentPosition + 1
    );
    outputStr += "Middle Wheel 2 : " + IntToChar(numStr) + "\n";

    // RIGHT WHEELS
    numStr = ShiftInt(
      ReverseMap(
        rightRotor.rotorMap,
        ShiftInt(numStr, rightRotor.currentPosition - 1)
      ),
      -rightRotor.currentPosition + 1
    );
    outputStr += "Right Wheel 2  : " + IntToChar(numStr) + "\n";

    // PLUGBOARD
    if (plugboard.has(numStr)) {
      numStr = plugboard.get(numStr)!;
    }
    outputStr += "Plugboard In : " + IntToChar(numStr) + "\n";

    // ENTRY DISC
    numStr = entryDisc.get(numStr)!;

    const answer = IntToChar(numStr);
    outputStr += "Output: " + answer + "\n";
    setStepOutput([...stepOutput, outputStr]);

    setActiveLamp(answer);
    const newLongOutput = longOutput + answer;
    setLongOutput(newLongOutput);
  };

  const handleChangeSetting = (
    lOpt: string,
    mOpt: string,
    rOpt: string,
    lInit: string,
    mInit: string,
    rInit: string
  ) => {
    const rotorMaps = new Map<string, Rotor>();
    rotorMaps.set("I", Rotor1());
    rotorMaps.set("II", Rotor2());
    rotorMaps.set("III", Rotor3());
    rotorMaps.set("IV", Rotor4());
    rotorMaps.set("V", Rotor5());

    if (lOpt === "") {
      lOpt = "I";
    }
    if (mOpt === "") {
      mOpt = "II";
    }
    if (rOpt === "") {
      rOpt = "III";
    }

    if (lInit === "") {
      lInit = "A";
    }
    if (mInit === "") {
      mInit = "A";
    }
    if (rInit === "") {
      rInit = "A";
    }

    setLeftRotor({
      rotorMap: rotorMaps.get(lOpt)?.rotorMap!,
      turnover: rotorMaps.get(lOpt)?.turnover!,
      currentPosition: CharToInt(lInit),
    });
    setMidRotor({
      rotorMap: rotorMaps.get(mOpt)?.rotorMap!,
      turnover: rotorMaps.get(mOpt)?.turnover!,
      currentPosition: CharToInt(mInit),
    });
    setRightRotor({
      rotorMap: rotorMaps.get(rOpt)?.rotorMap!,
      turnover: rotorMaps.get(rOpt)?.turnover!,
      currentPosition: CharToInt(rInit),
    });
  };

  const handleAddPlugboard = (plug1: number, plug2: number) => {
    if (plug1 === plug2) {
      return;
    }
    const newPlugboard = new Map(Array.from(plugboard));
    for (const [key, value] of newPlugboard) {
      if (
        key === plug1 ||
        value === plug1 ||
        key === plug2 ||
        value === plug2
      ) {
        newPlugboard.delete(key);
      }
    }
    newPlugboard.set(plug1, plug2);
    newPlugboard.set(plug2, plug1);
    setPlugbloard(newPlugboard);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center gap-5">
      {/* ROTORS */}
      <RotorSetting
        leftRotor={leftRotor!}
        midRotor={midRotor!}
        rightRotor={rightRotor!}
        handleChangeSetting={handleChangeSetting}
      />

      {/* LAMPS */}
      <Keylamp activeChar={activeLamp} />

      {/* KEYBOARDS & PLUGBOARD */}
      <div className="flex flex-col gap-2">
        <Keyboard handleKeypadRotor={handleKeypadRotor} />
        <Plugboard
          plugboard={plugboard}
          handleAddPlugboard={handleAddPlugboard}
        />
      </div>

      {/* OUTPUT */}
      <div className="flex flex-col w-full items-center justify-center gap-2 px-2">
        <Output input={longInput} output={longOutput} />
        <Step steps={stepOutput} />
        <button
          onClick={() => {
            setLongInput("");
            setLongOutput("");
            setStepOutput([]);
          }}
          className="px-4 py-2 border-[1px] font-medium border-white rounded-xl hover:bg-white hover:text-black transition-all"
        >
          Clear Output
        </button>
      </div>
    </div>
  );
};

export default Simulator;
