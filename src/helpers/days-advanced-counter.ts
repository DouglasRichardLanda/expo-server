export default function days_advanced_counter(today: Date, amount: number = 1) {
  const days = Array.from({length: amount}, (_, i) => {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    return nextDay;
  });
  // Format:: --> 2025-05-02T00:00:00.000Z []
  return days
}

/*
*
* This function calculates in a valid format some certain number of dates in advanced
*
* */