const {
  upperCharCodeStart,
  lowerCharCodeStart,
  isLowerCaseLetter,
  isUpperCaseLetter,
  lettersLength,
  lastUpperCharCode,
  lastLowerCharCode,
} = require('./utils');

const caesarCipher = (input, shift = 1, flag) => {
  const chooser = flag ? -1 : 1; // like decryption(0) or encryption(1)

  // E(x) = (x + shift) % lettersLength
  // D(x) = (x - shift) % lettersLength

  return input
    .split('')
    .map((character) => {
      if (isUpperCaseLetter(character)) {
        const move =
          (character.charCodeAt() - upperCharCodeStart + shift * chooser) % lettersLength;
        return String.fromCharCode(move > 0 ? move + upperCharCodeStart : move + lastUpperCharCode);
      } else if (isLowerCaseLetter(character)) {
        const move =
          (character.charCodeAt() - lowerCharCodeStart + shift * chooser) % lettersLength;
        return String.fromCharCode(move > 0 ? move + lowerCharCodeStart : move + lastLowerCharCode);
      }
      return character;
    })
    .join('');
};

module.exports = caesarCipher;
