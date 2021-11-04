const { isLowerCaseLetter, isUpperCaseLetter } = require('./utils');

const atbashCipher = (input) => {
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upperAlphabetReversed = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
  const lowerAlphabetReversed = 'zyxwvutsrqponmlkjihgfedcba';

  return input
    .split('')
    .map((character) => {
      if (isUpperCaseLetter(character))
        return upperAlphabetReversed[upperAlphabet.indexOf(character)];
      else if (isLowerCaseLetter(character))
        return lowerAlphabetReversed[lowerAlphabet.indexOf(character)];

      return character;
    })
    .join('');
};

module.exports = atbashCipher;
