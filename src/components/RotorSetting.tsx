import { AiFillSetting } from "react-icons/ai";
import { IntToChar, ShiftInt } from "../algorithm/HelperFunction";

interface Rotor {
  rotorMap: Map<number, number>;
  turnover: number;
  currentPosition: number;
}

interface RotorSettingProps {
  leftRotor: Rotor;
  midRotor: Rotor;
  rightRotor: Rotor;
}

const RotorSetting = ({
  leftRotor,
  midRotor,
  rightRotor,
}: RotorSettingProps) => {
  return (
    <div className="flex flex-row items-center justify-center text-black gap-5 font-medium">
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
      <button className="hover:scale-105 active:scale-95 transition-all">
        <AiFillSetting color="white" size={30} />
      </button>
    </div>
  );
};

export default RotorSetting;
