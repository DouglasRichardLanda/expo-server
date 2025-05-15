import digit_normaliser from "./digit-normaliser.ts";


export default async function calculate_lucky_number (b: number, n: number, fn: number) {
  return digit_normaliser(b + n + fn)
}
