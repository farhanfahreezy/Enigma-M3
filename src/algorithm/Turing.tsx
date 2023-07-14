import { Rotor1, Rotor2, Rotor3, Rotor4, Rotor5, UKWB } from "./Constant";
import { CharToInt, IntToChar, ReverseMap, ShiftInt } from "./HelperFunction";

interface Rotor {
  rotorMap: Map<number, number>;
  turnover: number;
  currentPosition: number;
}

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

// For this enigma cracker, i`ll use only rotor I-V configuration.
// Total comparison (in theory):
// 5 rotor in 3 slot = 5x5x5                    = 125 (assuming you can use same rotor more than once)
// 26 initial state for each rotor = 26x26x26   = 17576
// Plugboard                                    = about 1.07e+23 comparison (im gonna skip this because the amount of comparison is too much)
// Total = 125 x 17576 = 2197000 comparison (est 2.xx second execution time)

export async function SolveEnigma(
  encryptedMessage: string,
  knownMessage: string,
  plugboard?: Map<number, number>
): Promise<Answer | string> {
  if (!plugboard) plugboard = new Map<number, number>();

  let rotorConfig: number[] = [1, 1, 1];
  let initialRotorConfig: number[] = [1, 1, 1];
  let isFound = false;

  while (rotorConfig[0] < 6 && !isFound) {
    if (
      findAnswer(
        rotorConfig,
        initialRotorConfig,
        knownMessage,
        encryptedMessage,
        plugboard
      )
    ) {
      isFound = true;
    } else {
      initialRotorConfig = nextInitialConfig(initialRotorConfig);
      if (initialRotorConfig[0] > 26) {
        rotorConfig = nextRotor(rotorConfig);
        initialRotorConfig = [1, 1, 1];
      }
    }
  }
  if (isFound) {
    const answerString = fullDecrypt(
      rotorConfig,
      initialRotorConfig,
      encryptedMessage,
      plugboard
    );
    let answer: Answer = {
      encryptedMessage,
      knownMessage,
      answerString,
      leftRotor: rotorConfig[0].toString(),
      midRotor: rotorConfig[1].toString(),
      rightRotor: rotorConfig[2].toString(),
      initialleftRotor: IntToChar(initialRotorConfig[0]),
      initialmidRotor: IntToChar(initialRotorConfig[1]),
      initialrightRotor: IntToChar(initialRotorConfig[2]),
    };
    return answer;
  }

  return "Cannot decode";
}

function findAnswer(
  rotorConfig: number[],
  initialRotorConfig: number[],
  knownMessage: string,
  encryptedMessage: string,
  plugboard: Map<number, number>
): boolean {
  const strLen = knownMessage.length;
  let { leftRotor, midRotor, rightRotor } = getNewRotor(
    rotorConfig,
    initialRotorConfig
  );
  for (let i = 0; i < strLen; i++) {
    rotorCycle(leftRotor, midRotor, rightRotor);
    if (
      decrypt(
        leftRotor,
        midRotor,
        rightRotor,
        encryptedMessage[i],
        plugboard
      ) !== knownMessage[i]
    ) {
      return false;
    }
  }
  return true;
}

function rotorCycle(
  leftRotor: Rotor,
  midRotor: Rotor,
  rightRotor: Rotor
): void {
  if (rightRotor.currentPosition === rightRotor.turnover) {
    if (midRotor.currentPosition === midRotor.turnover) {
      leftRotor.currentPosition = ShiftInt(leftRotor.currentPosition, 1);
    }
    midRotor.currentPosition = ShiftInt(midRotor.currentPosition, 1);
  }
  rightRotor.currentPosition = ShiftInt(rightRotor.currentPosition, 1);
}

function decrypt(
  leftRotor: Rotor,
  midRotor: Rotor,
  rightRotor: Rotor,
  input: string,
  plugboard: Map<number, number>
): string {
  const reflector: Map<number, number> = UKWB();
  let numStr = CharToInt(input);

  // PLUGBOARD
  if (plugboard.has(numStr)) {
    numStr = plugboard.get(numStr)!;
  }

  // RIGHT WHEELS
  numStr = ShiftInt(
    rightRotor.rotorMap.get(ShiftInt(numStr, rightRotor.currentPosition - 1))!,
    -rightRotor.currentPosition + 1
  );

  // MIDDLE WHEELS
  numStr = ShiftInt(
    midRotor.rotorMap.get(ShiftInt(numStr, midRotor.currentPosition - 1))!,
    -midRotor.currentPosition + 1
  );

  // LEFT WHEELS
  numStr = ShiftInt(
    leftRotor.rotorMap.get(ShiftInt(numStr, leftRotor.currentPosition - 1))!,
    -leftRotor.currentPosition + 1
  );

  // REFLECTOR
  numStr = reflector.get(numStr)!;

  // LEFT WHEELS
  numStr = ShiftInt(
    ReverseMap(
      leftRotor.rotorMap,
      ShiftInt(numStr, leftRotor.currentPosition - 1)
    ),
    -leftRotor.currentPosition + 1
  );

  // MIDDLE WHEELS
  numStr = ShiftInt(
    ReverseMap(
      midRotor.rotorMap,
      ShiftInt(numStr, midRotor.currentPosition - 1)
    ),
    -midRotor.currentPosition + 1
  );

  // RIGHT WHEELS
  numStr = ShiftInt(
    ReverseMap(
      rightRotor.rotorMap,
      ShiftInt(numStr, rightRotor.currentPosition - 1)
    ),
    -rightRotor.currentPosition + 1
  );

  // PLUGBOARD
  if (plugboard.has(numStr)) {
    numStr = plugboard.get(numStr)!;
  }

  return IntToChar(numStr);
}

function fullDecrypt(
  rotorConfig: number[],
  initialRotorConfig: number[],
  input: string,
  plugboard: Map<number, number>
): string {
  let answer = "";
  const strLen = input.length;
  let { leftRotor, midRotor, rightRotor } = getNewRotor(
    rotorConfig,
    initialRotorConfig
  );
  for (let i = 0; i < strLen; i++) {
    rotorCycle(leftRotor, midRotor, rightRotor);
    const charAns = decrypt(
      leftRotor,
      midRotor,
      rightRotor,
      input[i],
      plugboard
    );
    answer += charAns;
  }

  return answer;
}

function nextRotor(rotorConfig: number[]): number[] {
  let nextRotors = { ...rotorConfig };
  if (nextRotors[2] === 5) {
    if (nextRotors[1] === 5) {
      nextRotors[0]++;
      nextRotors[1] = 1;
    } else {
      nextRotors[1]++;
    }
    nextRotors[2] = 1;
  } else {
    nextRotors[2]++;
  }
  return nextRotors;
}

function nextInitialConfig(initialRotorConfig: number[]): number[] {
  let nextConfig = { ...initialRotorConfig };
  if (nextConfig[2] === 26) {
    if (nextConfig[1] === 26) {
      nextConfig[0]++;
      nextConfig[1] = 1;
    } else {
      nextConfig[1]++;
    }
    nextConfig[2] = 1;
  } else {
    nextConfig[2]++;
  }
  return nextConfig;
}

function getNewRotor(
  rotorConfig: number[],
  initialRotorConfig: number[]
): { leftRotor: Rotor; midRotor: Rotor; rightRotor: Rotor } {
  let leftRotor: Rotor;
  let midRotor: Rotor;
  let rightRotor: Rotor;

  switch (rotorConfig[0]) {
    case 1:
      leftRotor = Rotor1();
      break;
    case 2:
      leftRotor = Rotor2();
      break;
    case 3:
      leftRotor = Rotor3();
      break;
    case 4:
      leftRotor = Rotor4();
      break;
    default:
      leftRotor = Rotor5();
      break;
  }
  switch (rotorConfig[1]) {
    case 1:
      midRotor = Rotor1();
      break;
    case 2:
      midRotor = Rotor2();
      break;
    case 3:
      midRotor = Rotor3();
      break;
    case 4:
      midRotor = Rotor4();
      break;
    default:
      midRotor = Rotor5();
      break;
  }
  switch (rotorConfig[2]) {
    case 1:
      rightRotor = Rotor1();
      break;
    case 2:
      rightRotor = Rotor2();
      break;
    case 3:
      rightRotor = Rotor3();
      break;
    case 4:
      rightRotor = Rotor4();
      break;
    default:
      rightRotor = Rotor5();
      break;
  }

  leftRotor.currentPosition = initialRotorConfig[0];
  midRotor.currentPosition = initialRotorConfig[1];
  rightRotor.currentPosition = initialRotorConfig[2];

  return { leftRotor, midRotor, rightRotor };
}
