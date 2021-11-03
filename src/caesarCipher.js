const {
  upperCharCodeStart,
  lowerCharCodeStart,
  isLowerCaseLetter,
  isUpperCaseLetter,
  lettersLength,
  upperCharCodeEnd,
  lastLowerCharCode,
} = require('./utils');

const caesarCipher = (input, shift = 1, flag) => {
  const chooser = flag ? 1 : -1; // like decryption(0) or encryption(1)
  const upperAdditive = flag ? upperCharCodeStart : upperCharCodeEnd;
  const lowerAdditive = flag ? lowerCharCodeStart : lastLowerCharCode;

  // E(x) = (x + shift) % lettersLength
  // D(x) = (x - shift) % lettersLength

  return input
    .split('')
    .map((character) => {
      if (isUpperCaseLetter(character))
        return String.fromCharCode(
          ((character.charCodeAt() - upperCharCodeStart + shift * chooser) % lettersLength) +
            upperAdditive
        );
      else if (isLowerCaseLetter(character))
        return String.fromCharCode(
          ((character.charCodeAt() - lowerCharCodeStart + shift * chooser) % lettersLength) +
            lowerAdditive
        );
      return character;
    })
    .join('');
};

module.exports = caesarCipher;
