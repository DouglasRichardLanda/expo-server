import comperer from "./matrix-comperer"
import COMPARISON_MATRIX from "../tables/comparison-matrix.ts";
import type {HUMAN_ENTITY_INTERFACE} from "../local-db/users-dto.ts";
import date_number from "./date-number.ts";
import digit_normaliser from "./digit-normaliser.ts";

export default function matrix_distributor(unit: Date, userNumbers: {luckynumber: number, namenumber: number, birthdaynumber: number}, record: {full: string, first: string, second: string}[]) {
  record.push({
    full: comperer(COMPARISON_MATRIX.get(Number(userNumbers.luckynumber)) as number[][], date_number(unit)),
    first: comperer(COMPARISON_MATRIX.get(Number(userNumbers.namenumber)) as number[][], digit_normaliser(unit.getDate())),
    second: comperer(COMPARISON_MATRIX.get(Number(userNumbers.birthdaynumber)) as number[][], date_number(unit))
  })
}

/*
*
* This function takes a date, then it calculates with matrix the results for every provided day
*
* */