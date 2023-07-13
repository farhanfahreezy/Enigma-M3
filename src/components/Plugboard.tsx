import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Dropdown from "./Dropdown";
import { CharToInt, IntToChar } from "../algorithm/HelperFunction";

interface PlugboardProps {
  handleAddPlugboard: (plug1: number, plug2: number) => void;
  plugboard: Map<number, number>;
}

const Plugboard = ({ handleAddPlugboard, plugboard }: PlugboardProps) => {
  const [openBoard, setopenBoard] = useState(false);
  const [plug1, setplug1] = useState("");
  const [plug2, setplug2] = useState("");
  return (
    <div className="flex flex-col items-start justify-between w-full max-w-[344px] sm:max-w-[532px] bg-slate-600 rounded-md p-1 gap-1">
      <div className="flex flex-row justify-between items-center pr-2 w-full">
        <div className="bg-black py-1 px-3 rounded-md shadow-xl">Plugboard</div>
        <button onClick={() => setopenBoard(!openBoard)}>
          {openBoard ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
        </button>
      </div>
      <div className="flex flex-row w-full gap-2 p-2 bg-black rounded-lg">
        {openBoard && (
          <>
            <div className="w-2/5 flex flex-col bg-slate-600 p-2 rounded-md gap-2">
              <div className="font-medium">Add Plugboard</div>
              <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-2">
                <Dropdown
                  title={plug1 === "" ? "Plug 1" : plug1}
                  width="100px"
                  modalHeight="200px"
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
                    setplug1(s);
                  }}
                />
                <Dropdown
                  title={plug2 === "" ? "Plug 2" : plug2}
                  width="100px"
                  modalHeight="200px"
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
                    setplug2(s);
                  }}
                />
              </div>
              <button
                className="px-3 py-1 bg-slate-500 shadow-xl rounded-lg"
                onClick={() => {
                  handleAddPlugboard(CharToInt(plug1), CharToInt(plug2));
                }}
              >
                Add
              </button>
            </div>
            <div className="w-3/5 flex flex-col bg-slate-600 p-2 rounded-md gap-2">
              <div className="font-medium">Plugboard List</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                {Array.from(plugboard).map(([key, value]) => (
                  <div
                    key={key}
                    className="py-1 px-2 w-fit bg-slate-500 shadow-xl rounded-lg"
                  >
                    {IntToChar(key)} to {IntToChar(value)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Plugboard;
