export default function comperer(x: number[][], n: number): string {
  if (x[0] && x[0].includes(n)) {
    return "green" // GOOD DAY
  } else if (x[1] && x[1].includes(n)) {
    return "orange" // ORDINARY DAY
  } else {
    return "red" // BAD DAY
  }
}
/*
* This function compares the number we give with what we have in matrix
*
* */