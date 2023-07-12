interface LampInterface {
  char: string;
  active: boolean;
}

const Lamp = ({ char, active }: LampInterface) => {
  return (
    <div
      className={` ${
        active ? " bg-yellow-100" : "bg-slate-200"
      } flex flex-col aspect-square w-[30px] sm:w-[40px] rounded-full items-center justify-center text-black font-bold select-none`}
    >
      {char}
    </div>
  );
};

export default Lamp;
