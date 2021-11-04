const lettersLength = 26;
const upperCharCodeStart = 64;
const lastUpperCharCode = 90;
const lowerCharCodeStart = 96;
const lastLowerCharCode = 122;

const isUpperCaseLetter = (letter) =>
  upperCharCodeStart < letter.charCodeAt() && letter.charCodeAt() <= lastUpperCharCode;
const isLowerCaseLetter = (letter) =>
  lowerCharCodeStart < letter.charCodeAt() && letter.charCodeAt() <= lastLowerCharCode;

module.exports = {
  upperCharCodeStart,
  lowerCharCodeStart,
  lastUpperCharCode,
  lastLowerCharCode,
  isLowerCaseLetter,
  isUpperCaseLetter,
  lettersLength,
};
