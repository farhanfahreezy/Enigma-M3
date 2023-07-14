import { ChangeEvent, useState } from "react";
import { SolveEnigma } from "../algorithm/Turing";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Answer {
  knownMessage: string;
  encryptedMessage: string;
  answerString: string;
  leftRotor: string;
  midRotor: string;
  rightRotor: string;
  initialleftRotor: string;
  initialmidRotor: string;
  initialrightRotor: string;
}

const TuringCracker = () => {
  // CONST
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [knownMessage, setKnownMessage] = useState("");
  const [answer, setAnswer] = useState<Answer | string>("");

  // FUNCTION
  const handleSubmit = () => {
    if (encryptedMessage !== "" && knownMessage !== "") {
      SolveEnigma(encryptedMessage, knownMessage).then((res) => setAnswer(res));
    } else {
      setAnswer("Fill both fields!");
    }
  };
  return (
    <div className="w-full overflow-x-hidden flex flex-col items-center justify-center gap-5">
      <div
        className="flex flex-col w-full max-w-[600px] items-center justify-center gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full justify-start items-start gap-1">
          <label className="font-medium text-[18px]">Encrypted Message</label>
          <input
            className="w-full rounded-md py-2 px-3 ring-0 focus:outline-0 text-black"
            placeholder="Write something here..."
            value={encryptedMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEncryptedMessage(
                e.target.value.replace(" ", "").toUpperCase()
              );
            }}
          />
        </div>
        <div className="flex flex-col w-full justify-start items-start gap-1 pb-5">
          <label className="font-medium text-[18px]">Known Message</label>
          <input
            className="w-full rounded-md py-2 px-3 ring-0 focus:outline-0 text-black"
            placeholder="Write something here..."
            value={knownMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setKnownMessage(e.target.value.replace(" ", "").toUpperCase());
            }}
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          className="py-1 px-3 w-full max-w-[180px] border-2 hover:bg-white hover:text-black rounded-lg text-[24px] font-semibold transition-all"
        >
          Decode!
        </button>
      </div>
      <div>
        {typeof answer === "string" ? (
          answer
        ) : (
          <div className="flex flex-col w-full max-w-[600px] bg-slate-600 p-2 rounded-md gap-2">
            <div className="flex flex-col gap-2 bg-black p-3 pb-2 rounded-md">
              <div className="bg-white text-black px-3 py-1 rounded-md w-fit font-medium">
                Encrypted message
              </div>
              <div className="pl-1 whitespace-pre-wrap break-words">
                {answer.encryptedMessage}
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-black p-3 pb-2 rounded-md">
              <div className="bg-white text-black px-3 py-1 rounded-md w-fit font-medium">
                Known message
              </div>
              <div className="pl-1 whitespace-pre-wrap break-words">
                {answer.knownMessage}
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-black p-3 pb-2 rounded-md">
              <div className="bg-white text-black px-3 py-1 rounded-md w-fit font-medium">
                Decrypted message
              </div>
              <div className="pl-1 whitespace-pre-wrap break-words">
                {answer.answerString}
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-black p-3 pb-2 rounded-md">
              <div className="bg-white text-black px-3 py-1 rounded-md w-fit font-medium">
                {"Rotor config (from left to right)"}
              </div>
              <div className="pl-1 whitespace-pre-wrap break-words">
                {answer.leftRotor}
                {", "}
                {answer.midRotor}
                {", "}
                {answer.rightRotor}
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-black p-3 pb-2 rounded-md">
              <div className="bg-white text-black px-3 py-1 rounded-md w-fit font-medium">
                {"Initial rotor configuration (from left to right)"}
              </div>
              <div className="pl-1 whitespace-pre-wrap break-words">
                {answer.initialleftRotor}
                {", "}
                {answer.initialmidRotor}
                {", "}
                {answer.initialrightRotor}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full max-w-[600px] font-medium p-5">
        <div className="sm:text-[24px]">
          What this decoder can and cannot do?
        </div>
        <ul className="text-[12px] sm:text-[18px]">
          <li className="flex flex-row items-center justify-start gap-2">
            <FaCheck color={"#A5D6A7"} /> Decode encrypted message using rotor 1
            to 5
          </li>
          <li className="flex flex-row items-center justify-start gap-2">
            <FaCheck color={"#A5D6A7"} /> Decode encrypted message with custom
            initial rotor position
          </li>
          <li className="flex flex-row items-center justify-start gap-2">
            <FaTimes color={"#EF9A9A"} /> Decode encrypted message using custom
            plugboard
          </li>
          <li className="flex flex-row items-center justify-start gap-2">
            <FaTimes color={"#EF9A9A"} /> Decode encrypted message using custom
            ring setting
          </li>
          <li className="flex flex-row items-center justify-start gap-2">
            <FaTimes color={"#EF9A9A"} /> Decode encrypted message without known
            message
          </li>
        </ul>
      </div>
    </div>
  );
};
export default TuringCracker;
