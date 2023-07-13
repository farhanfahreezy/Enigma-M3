interface OutputProps {
  input: string;
  output: string;
}

const Output = ({ input, output }: OutputProps) => {
  const formatString = (str: string) => {
    const regex = /.{1,5}/g;
    return str.match(regex)?.join(" ");
  };
  return (
    <div className="flex flex-row min-h-[200px] w-full max-w-[400px] gap-2 bg-slate-900 p-2 rounded-lg">
      <div className="flex flex-col w-full items-start justify-start bg-slate-600 py-2 px-2.5 rounded-md whitespace-normal overflow-hidden">
        <div className="font-medium underline underline-offset-2">Input</div>
        <div className="w-full">{formatString(input)}</div>
      </div>

      <div className="flex flex-col w-full items-start justify-start bg-slate-600 py-2 px-2.5 rounded-md whitespace-normal overflow-auto">
        <div className="font-medium underline underline-offset-2">Output</div>
        <div>{formatString(output)}</div>
      </div>
    </div>
  );
};

export default Output;
