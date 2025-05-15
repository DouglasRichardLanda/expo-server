import RUSSIAN_LETTER_TABLE from "../tables/russian-letter-table.ts";
import digit_normaliser from "./digit-normaliser.ts";


export default async function name_number (name: string) {
  const letterblock: string[] = name.toLowerCase().split("");
  if (letterblock.length < 1) throw new Error("")
  let sum: number = 0;

  return digit_normaliser(sum)
}