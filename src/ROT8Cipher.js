const { isLowerCaseLetter, isUpperCaseLetter } = require('./utils');

const ROT8Cipher = (input) => {
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const upperAlphabetPropelled = 'IJKLMNOPQRSTUVWXYZABCDEFGH';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerAlphabetPropelled = 'ijklmnopqrstuvwxyzabcdefgh';

  return input
    .split('')
    .map((character) => {
      if (isUpperCaseLetter(character))
        return upperAlphabetPropelled[upperAlphabet.indexOf(character)];
      else if (isLowerCaseLetter(character))
        return lowerAlphabetPropelled[lowerAlphabet.indexOf(character)];

      return character;
    })
    .join('');
};

console.log(ROT8Cipher('IJKLMNOPQRSTUVWXYZABCDEFGH'));

module.exports = ROT8Cipher;
