import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface StepProps {
  steps: string[];
}

const Step = ({ steps }: StepProps) => {
  const [openStep, setOpenStep] = useState(false);
  return (
    <div className="flex flex-col max-h-[400px] w-full max-w-[400px] gap-2 bg-slate-900 p-2 rounded-lg">
      <div className="flex flex-row justify-between px-1">
        <div>Detailed Steps</div>
        <button onClick={() => setOpenStep(!openStep)}>
          {openStep ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
        </button>
      </div>

      <div className="flex flex-col w-full items-start justify-start bg-slate-600 py-2 px-2.5 rounded-md whitespace-normal overflow-x-auto gap-5">
        {openStep &&
          steps.map((step) => (
            <div className="w-full flex flex-col" key={step}>
              {step.split("\n").map((specifiedStep) => (
                <div key={specifiedStep}>{specifiedStep}</div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Step;
