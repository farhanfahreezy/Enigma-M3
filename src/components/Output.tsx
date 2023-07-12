import React from "react";

interface OutputProps {
  input: string;
  output: string;
}

const Output = ({ input, output }: OutputProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div>Input</div>
      <div>{input}</div>
      <div>Output</div>
      <div>{output}</div>
    </div>
  );
};

export default Output;
