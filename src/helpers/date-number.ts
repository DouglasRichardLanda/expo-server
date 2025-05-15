import digit_normaliser from "../helpers/digit-normaliser";

export default function date_number (date: Date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()

  const year_arr = year.split("")
  const month_arr = month.split("")
  const day_arr = day.split("")

  const datearray = [...year_arr, ...month_arr, ...day_arr]

  let local: number = 0;
  for (let i = 0; i < datearray.length; i++) {
    local = digit_normaliser(Number(datearray[i]) + local)
  }

  return local
}

/*
*
* This function calculates the number of the day. It doesn't matter if 2025.01.32 or just 12
*
* */


// TESTS
// console.log(date_number(new Date("2025-05-15T00:00:00.000Z")))
// console.log(date_number(new Date("2025-05-16T00:00:00.000Z")))
// console.log(date_number(new Date("2025-05-17T00:00:00.000Z")))
// console.log(date_number(new Date("2025-05-18T00:00:00.000Z")))
// console.log(date_number(new Date("2025-06-01T00:00:00.000Z")))
// console.log(date_number(new Date("2025-06-11T00:00:00.000Z")))
// console.log(date_number(new Date("2025-06-30T00:00:00.000Z")))
