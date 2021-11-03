const { isLowerCaseLetter, isUpperCaseLetter } = require('./utils');

const atbashCipher = (input) => {
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upperAlphabetReverse = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
  const lowerAlphabetReverse = 'zyxwvutsrqponmlkjihgfedcba';

  return input
    .split('')
    .map((character) => {
      if (isUpperCaseLetter(character))
        return upperAlphabetReverse[upperAlphabet.indexOf(character)];
      else if (isLowerCaseLetter(character))
        return lowerAlphabetReverse[lowerAlphabet.indexOf(character)];

      return character;
    })
    .join('');
};

console.log(atbashCipher('Svool Dliow!'));

module.exports = atbashCipher;
