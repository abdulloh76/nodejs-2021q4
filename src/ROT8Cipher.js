const { isLowerCaseLetter, isUpperCaseLetter } = require('./utils');

const ROT8Cipher = (input, flag) => {
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const upperAlphabetPropelled = 'IJKLMNOPQRSTUVWXYZABCDEFGH';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerAlphabetPropelled = 'ijklmnopqrstuvwxyzabcdefgh';

  // like decryption(0) or encryption(1)

  return input
    .split('')
    .map((character) => {
      if (isUpperCaseLetter(character))
        return flag
          ? upperAlphabet[upperAlphabetPropelled.indexOf(character)]
          : upperAlphabetPropelled[upperAlphabet.indexOf(character)];
      else if (isLowerCaseLetter(character))
        return flag
          ? lowerAlphabet[lowerAlphabetPropelled.indexOf(character)]
          : lowerAlphabetPropelled[lowerAlphabet.indexOf(character)];

      return character;
    })
    .join('');
};

module.exports = ROT8Cipher;
