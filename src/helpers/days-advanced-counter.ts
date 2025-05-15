

export default function days_advanced_counter() {
  const next14Days = Array.from({length: 14}, (_, i) => {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    return nextDay;
  });
}