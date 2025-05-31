import RUSSIAN_LETTER_TABLE from "../tables/russian-letter-table.ts";
import digit_normaliser from "./digit-normaliser.ts";


export default function name_number (name: string) {
  const letterblock: string[] = name.toLowerCase().split("").filter(ch => ch !== " ");
  if (letterblock.length < 1) throw new Error("")

  const sum = letterblock.reduce((acc, ch) => acc + (RUSSIAN_LETTER_TABLE.get(ch) ?? 0), 0);

  return digit_normaliser(sum)
}