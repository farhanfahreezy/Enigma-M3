import { CharToInt } from "./HelperFunction";

interface Rotor {
  rotorMap: Map<number, number>;
  turnover: number;
  currentPosition: number;
}

export function Rotor1(): Rotor {
  const path = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  const rotorMap = RotorGenerator(path);
  const rotor: Rotor = {
    rotorMap,
    turnover: CharToInt("Q"),
    currentPosition: 1,
  };
  return rotor;
}

export function Rotor2(): Rotor {
  const path = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
  const rotorMap = RotorGenerator(path);
  const rotor: Rotor = {
    rotorMap,
    turnover: CharToInt("E"),
    currentPosition: 1,
  };
  return rotor;
}

export function Rotor3(): Rotor {
  const path = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
  const rotorMap = RotorGenerator(path);
  const rotor: Rotor = {
    rotorMap,
    turnover: CharToInt("V"),
    currentPosition: 1,
  };
  return rotor;
}

export function Rotor4(): Rotor {
  const path = "ESOVPZJAYQUIRHXLNFTGKDCMWB";
  const rotorMap = RotorGenerator(path);
  const rotor: Rotor = {
    rotorMap,
    turnover: CharToInt("J"),
    currentPosition: 1,
  };
  return rotor;
}

export function Rotor5(): Rotor {
  const path = "VZBRGITYUPSDNHLXAWMJQOFECK";
  const rotorMap = RotorGenerator(path);
  const rotor: Rotor = {
    rotorMap,
    turnover: CharToInt("Z"),
    currentPosition: 1,
  };
  return rotor;
}

export function ETW(): Map<number, number> {
  const path = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rotorMap = RotorGenerator(path);
  return rotorMap;
}

export function UKWB(): Map<number, number> {
  const path = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
  const rotorMap = RotorGenerator(path);
  return rotorMap;
}

export function RotorGenerator(path: string): Map<number, number> {
  const rotorMap = new Map<number, number>();
  for (let i = 1; i <= 26; i++) {
    rotorMap.set(i, path.substring(i - 1, i).charCodeAt(0) - 64);
  }

  return rotorMap;
}
