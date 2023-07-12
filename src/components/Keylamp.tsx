import Lamp from "./Lamp";

interface KeylampProps {
  activeChar: string;
}

const Keylamp = ({ activeChar }: KeylampProps) => {
  const top = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const mid = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottom = ["Z", "X", "C", "V", "B", "N", "M"];
  return (
    <div className="flex flex-col justify-center items-center gap-1 p-1 sm:gap-3 sm:p-3 rounded-md">
      <div className="flex flex-row gap-1 sm:gap-3">
        {top.map((char) => (
          <Lamp char={char} active={char === activeChar} key={char} />
        ))}
      </div>
      <div className="flex flex-row gap-1 sm:gap-3">
        {mid.map((char) => (
          <Lamp char={char} active={char === activeChar} key={char} />
        ))}
      </div>
      <div className="flex flex-row gap-1 sm:gap-3 ">
        {bottom.map((char) => (
          <Lamp char={char} active={char === activeChar} key={char} />
        ))}
      </div>
    </div>
  );
};

export default Keylamp;
