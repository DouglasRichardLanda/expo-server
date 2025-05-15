import RUSSIAN_LETTER_TABLE from "../tables/russian-letter-table.ts";
import digit_normaliser from "./digit-normaliser.ts";


export default async function name_number (name: string) {

  const letterblock: string[] = name.toLowerCase().split("");
  if (letterblock.length < 1) throw new Error("")
  let sum: number = 0;

  // TODO:: needs to be completed
  // for (let i = 0; i < letterblock.length; i++) {
  //   const local = RUSSIAN_LETTER_TABLE.get(letterblock[i]);
  //   if (local !== 0) {
  //     sum += local
  //   } else {
  //     console.log(`Key "${letterblock[i]}" not found in the map.`);
  //   }
  // }

  return digit_normaliser(sum)
}