import { AiFillSetting } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { IntToChar, ShiftInt } from "../algorithm/HelperFunction";
import { useState } from "react";
import Dropdown from "./Dropdown";

interface Rotor {
  rotorMap: Map<number, number>;
  turnover: number;
  currentPosition: number;
}

interface RotorSettingProps {
  leftRotor: Rotor;
  midRotor: Rotor;
  rightRotor: Rotor;
  handleChangeSetting: (
    lOpt: string,
    mOpt: string,
    rOpt: string,
    lInit: string,
    mInit: string,
    rInit: string
  ) => void;
}

const RotorSetting = ({
  leftRotor,
  midRotor,
  rightRotor,
  handleChangeSetting,
}: RotorSettingProps) => {
  const [openSetting, setOpenSetting] = useState(false);

  const [leftRotorOption, setLeftRotorOption] = useState("");
  const [middleRotorOption, setMiddleRotorOption] = useState("");
  const [rightRotorOption, setRightRotorOption] = useState("");
  const [leftRotorInitial, setLeftRotorInitial] = useState("");
  const [middleRotorInitial, setMiddleRotorInitial] = useState("");
  const [rightRotorInitial, setRightRotorInitial] = useState("");
  return (
    <div className="relative flex flex-row items-center justify-center text-black gap-5 font-medium">
      <div className="w-[30px]"></div>
      <div className="flex flex-col items-center justify-around bg-white w-[20px] h-[90px] rounded-sm">
        <div>{IntToChar(ShiftInt(leftRotor.currentPosition, 1))}</div>
        <div className="border-t-[1px] border-b-[1px] w-full text-center border-black py-1">
          {IntToChar(leftRotor.currentPosition)}
        </div>
        <div>{IntToChar(ShiftInt(leftRotor.currentPosition, -1))}</div>
      </div>
      <div className="flex flex-col items-center justify-around bg-white w-[20px] h-[90px] rounded-sm">
        <div>{IntToChar(ShiftInt(midRotor.currentPosition, 1))}</div>
        <div className="border-t-[1px] border-b-[1px] w-full text-center border-black py-1">
          {IntToChar(midRotor.currentPosition)}
        </div>
        <div>{IntToChar(ShiftInt(midRotor.currentPosition, -1))}</div>
      </div>
      <div className="flex flex-col items-center justify-around bg-white w-[20px] h-[90px] rounded-sm">
        <div>{IntToChar(ShiftInt(rightRotor.currentPosition, 1))}</div>
        <div className="border-t-[1px] border-b-[1px] w-full text-center border-black py-1">
          {IntToChar(rightRotor.currentPosition)}
        </div>
        <div>{IntToChar(ShiftInt(rightRotor.currentPosition, -1))}</div>
      </div>
      <button
        onClick={() => setOpenSetting(true)}
        className="hover:scale-105 active:scale-95 transition-all"
      >
        <AiFillSetting color="white" size={30} />
      </button>

      {/* SETTING */}
      {openSetting && (
        <div className="absolute top-[-10px] bg-slate-400 bg-opacity-95 rounded-xl p-[20px] pr-[50px] text-white">
          <button
            className="absolute top-[10px] right-[10px] hover:scale-105 active:scale-95 transition-all"
            onClick={() => setOpenSetting(false)}
          >
            <IoMdClose size={30} color={"white"} />
          </button>

          {/* Setting Panel */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center w-full justify-between gap-2">
              <div className="whitespace-nowrap">Left Rotor</div>
              <div>
                <div className="flex flex-row">
                  <Dropdown
                    title={leftRotorOption === "" ? "Rotor" : leftRotorOption}
                    option={["I", "II", "III", "IV", "V"]}
                    onClick={(s: string) => {
                      setLeftRotorOption(s);
                    }}
                  />
                  <Dropdown
                    title={
                      leftRotorInitial === "" ? "Initial" : leftRotorInitial
                    }
                    option={[
                      "A",
                      "B",
                      "C",
                      "D",
                      "E",
                      "F",
                      "G",
                      "H",
                      "I",
                      "J",
                      "K",
                      "L",
                      "M",
                      "N",
                      "O",
                      "P",
                      "Q",
                      "R",
                      "S",
                      "T",
                      "U",
                      "V",
                      "W",
                      "X",
                      "Y",
                      "Z",
                    ]}
                    onClick={(s: string) => {
                      setLeftRotorInitial(s);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center w-full justify-between gap-2">
              <div className="whitespace-nowrap">Middle Rotor</div>
              <div>
                <div className="flex flex-row">
                  <Dropdown
                    title={
                      middleRotorOption === "" ? "Rotor" : middleRotorOption
                    }
                    option={["I", "II", "III", "IV", "V"]}
                    onClick={(s: string) => {
                      setMiddleRotorOption(s);
                    }}
                  />
                  <Dropdown
                    title={
                      middleRotorInitial === "" ? "Initial" : middleRotorInitial
                    }
                    option={[
                      "A",
                      "B",
                      "C",
                      "D",
                      "E",
                      "F",
                      "G",
                      "H",
                      "I",
                      "J",
                      "K",
                      "L",
                      "M",
                      "N",
                      "O",
                      "P",
                      "Q",
                      "R",
                      "S",
                      "T",
                      "U",
                      "V",
                      "W",
                      "X",
                      "Y",
                      "Z",
                    ]}
                    onClick={(s: string) => {
                      setMiddleRotorInitial(s);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center w-full justify-between gap-2">
              <div className="whitespace-nowrap">Right Rotor</div>
              <div>
                <div className="flex flex-row">
                  <Dropdown
                    title={rightRotorOption === "" ? "Rotor" : rightRotorOption}
                    option={["I", "II", "III", "IV", "V"]}
                    onClick={(s: string) => {
                      setRightRotorOption(s);
                    }}
                  />
                  <Dropdown
                    title={
                      rightRotorInitial === "" ? "Initial" : rightRotorInitial
                    }
                    option={[
                      "A",
                      "B",
                      "C",
                      "D",
                      "E",
                      "F",
                      "G",
                      "H",
                      "I",
                      "J",
                      "K",
                      "L",
                      "M",
                      "N",
                      "O",
                      "P",
                      "Q",
                      "R",
                      "S",
                      "T",
                      "U",
                      "V",
                      "W",
                      "X",
                      "Y",
                      "Z",
                    ]}
                    onClick={(s: string) => {
                      setRightRotorInitial(s);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center text-black pl-[20px] gap-2 pt-4">
              <button
                className="py-2 px-6 bg-white rounded-xl"
                onClick={() => setOpenSetting(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-6 bg-white rounded-xl"
                onClick={() => {
                  setOpenSetting(false);
                  handleChangeSetting(
                    leftRotorOption,
                    middleRotorOption,
                    rightRotorOption,
                    leftRotorInitial,
                    middleRotorInitial,
                    rightRotorInitial
                  );
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RotorSetting;
