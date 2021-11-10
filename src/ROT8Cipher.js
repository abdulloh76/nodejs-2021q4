const { isLowerCaseLetter, isUpperCaseLetter } = require('./utils');

const ROT8Cipher = (flag) => {
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const upperAlphabetPropelled = 'IJKLMNOPQRSTUVWXYZABCDEFGH';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerAlphabetPropelled = 'ijklmnopqrstuvwxyzabcdefgh';

  // like decryption(0) or encryption(1)

  return (input) =>
    input
      .split('')
      .map((character) => {
        if (isUpperCaseLetter(character))
          return flag
            ? upperAlphabetPropelled[upperAlphabet.indexOf(character)]
            : upperAlphabet[upperAlphabetPropelled.indexOf(character)];
        else if (isLowerCaseLetter(character))
          return flag
            ? lowerAlphabetPropelled[lowerAlphabet.indexOf(character)]
            : lowerAlphabet[lowerAlphabetPropelled.indexOf(character)];

        return character;
      })
      .join('');
};

module.exports = ROT8Cipher;
