export function getWordEnding (num, word_variants) {
  // Возвращает правильный вариант окончания слова в зависимости от числа

  if ( !(Array.isArray(word_variants) && word_variants.length === 3) ) {
    throw new Error('Представлены неверные формы склонения')
  } 

  const cases = [2, 0, 1, 1, 1, 2];

  if (num % 100 > 4 && num % 100 < 20) {
    return word_variants[2]
  } else {

    let index
    if (num % 10 < 5) 
      index = cases[num % 10];
    else 
      index = cases[5];

    return word_variants[index]
  }
}