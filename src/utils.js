const { stderr, exit } = require('process');

const lettersLength = 26;
const upperCharCodeStart = 64;
const lastUpperCharCode = 90;
const lowerCharCodeStart = 96;
const lastLowerCharCode = 122;

const isUpperCaseLetter = (letter) =>
  upperCharCodeStart < letter.charCodeAt() && letter.charCodeAt() <= lastUpperCharCode;
const isLowerCaseLetter = (letter) =>
  lowerCharCodeStart < letter.charCodeAt() && letter.charCodeAt() <= lastLowerCharCode;

const grab = (fullFlag) => {
  const fullFlagIndex = process.argv.indexOf(fullFlag);
  const shortFlagIndex = process.argv.indexOf(fullFlag.slice(1, 3));

  if (
    (fullFlagIndex !== -1 && fullFlagIndex !== process.argv.lastIndexOf(fullFlag)) ||
    (shortFlagIndex !== -1 && shortFlagIndex !== process.argv.lastIndexOf(fullFlag.slice(1, 3))) ||
    (shortFlagIndex !== -1 && fullFlagIndex !== -1)
  )
    handleError(`${fullFlag.slice(2)} was duplicated`);

  if (fullFlagIndex !== -1) return process.argv[fullFlagIndex + 1];
  else if (shortFlagIndex !== -1) return process.argv[shortFlagIndex + 1];
  return false;
};

const handleError = (message) => {
  stderr.write(message);
  exit(1);
};

module.exports = {
  upperCharCodeStart,
  lowerCharCodeStart,
  lastUpperCharCode,
  lastLowerCharCode,
  isLowerCaseLetter,
  isUpperCaseLetter,
  lettersLength,
  grab,
  handleError,
};
