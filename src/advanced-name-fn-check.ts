import RUSSIAN_LETTER_TABLE from './tables/russian-letter-table';
import digit_normaliser from "./helpers/digit-normaliser.ts";

function nameValueContext(name: string): number {
  let total = 0;

  const lettersRaw = name.toLowerCase().replace(/[ьъ]/g, '');

  // убираем удвоенные согласные
  const letters: string[] = [];
  for (let i = 0; i < lettersRaw.length; i++) {
    const char = lettersRaw[i] ?? "";
    if (i === 0 || char !== (lettersRaw[i - 1] ?? "") || !isConsonant(char)) {
      letters.push(char);
    }
  }

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i]!;
    const prev = i > 0 ? letters[i - 1]! : undefined;
    const isFirst = i === 0;

    let value = 0;

    // ✅ Правило: если 'й' сразу после 'и' — всегда 9
    if (char === 'й' && prev === 'и') {
      value = 9;
    }
    // Йотированные гласные
    else if (char === 'е') {
      if (isFirst) value = RUSSIAN_LETTER_TABLE.get('е') ?? 0;
      else if (prev && isConsonant(prev)) value = RUSSIAN_LETTER_TABLE.get('э') ?? 0;
      else value = RUSSIAN_LETTER_TABLE.get('е') ?? 0;
    } else if (char === 'ё') {
      value = RUSSIAN_LETTER_TABLE.get('е') ?? 0;
    } else if (char === 'ю') {
      value = isFirst ? (RUSSIAN_LETTER_TABLE.get('ю') ?? 0)
        : (RUSSIAN_LETTER_TABLE.get('у') ?? 0);
    } else if (char === 'я') {
      value = isFirst
        ? (RUSSIAN_LETTER_TABLE.get('и') ?? 0) + (RUSSIAN_LETTER_TABLE.get('а') ?? 0)
        : (RUSSIAN_LETTER_TABLE.get('а') ?? 0);
    } else {
      value = RUSSIAN_LETTER_TABLE.get(char) ?? 0;
    }

    console.log("LETTER::", char, "VALUE::", value);
    total = digit_normaliser(total + value);
  }

  return total;
}

// Helper: check consonant
function isConsonant(c: string): boolean {
  const vowels = ['а','е','ё','и','о','у','ы','э','ю','я'];
  return !vowels.includes(c);
}

// export default nameValueContext;


// console.log(nameValueContext("Васильева Марина Федор")); // 1
// console.log(nameValueContext("Аркадий Николай Чернобородов")); // 3
// console.log(nameValueContext("Дмитрий Андрей Петров")); // 8
// console.log(nameValueContext("Арина Валерий Тарабукина")); // 7
// console.log(nameValueContext("Шапка Станислав Сергей")); // 11 ?
