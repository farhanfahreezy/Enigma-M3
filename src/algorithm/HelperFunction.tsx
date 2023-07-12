export function CharToInt(s: string): number {
  return s.charCodeAt(0) - 64;
}

export function IntToChar(n: number): string {
  return String.fromCharCode(n + 64);
}

export function ShiftInt(n: number, shift: number): number {
  const result = n + shift;
  if (result > 26) {
    return result - 26;
  } else if (result < 1) {
    return result + 26;
  }
  return result;
}

export function ReverseMap(map: Map<number, number>, n: number): number {
  for (const [key, value] of map) {
    if (value === n) {
      return key;
    }
  }
  return 0;
}
