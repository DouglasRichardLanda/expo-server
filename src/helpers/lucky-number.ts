import digit_normaliser from "./digit-normaliser.ts";


export default function calculate_lucky_number (b: number, n: number) {
  return digit_normaliser(b + n)
}
