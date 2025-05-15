export default function digit_normaliser(argument: number, acc: number = 0) {
  if (argument === 10) {
    return 1
  } else if (argument === 11) {
    return 11
  } else if (argument === 22) {
    return 22
  }
  if (argument < 10) {
    return argument + acc
  }
  let sum = 0;
  while (argument > 0) {
    sum += argument % 10;
    argument = Math.floor(argument / 10);
  }
  if (sum === 1 || sum === 11 || sum === 22) {
    return sum;
  }
  return digit_normaliser(sum, 0);
}

/*
*
* This function takes a digit and sums elements of it into a single digit e.g. 12 => 1 + 2 = 3 or 25 => 2 + 5 = 7, etc.
*
* */