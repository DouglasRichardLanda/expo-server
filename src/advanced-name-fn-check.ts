function nameValueContext(name: string): number {
  let total = 0;
  const letters = name.toLowerCase();
  const specialLetters = ['g', 'k']; // example special letters
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    if (!char) return total
    const code = char.charCodeAt(0);

    if (code >= 97 && code <= 122) { // a-z
      let value = code - 96; // normal value

      // Special rules for first/last letters
      if (char === 'a' && i === 0) value *= 2;
      if (char === 'n' && i === letters.length - 1) value += 5;

      // Context-aware rule for special letters in the middle
      if (specialLetters.includes(char) && i > 0 && i < letters.length - 1) {
        const prev = letters[i - 1];
        if (!prev) return total
        if (vowels.includes(prev)) {
          value += 3; // add 3 if previous letter is a vowel
        } else {
          value += 1; // add 1 if previous letter is not a vowel
        }
      }

      total += value;
    }
  }

  return total;
}

console.log(nameValueContext("Angela"));
