const atbashCipher = require('./src/atbashCipher');
const caesarCipher = require('./src/caesarCipher');
const ROT8Cipher = require('./src/ROT8Cipher');
const fsPromises = require('fs/promises');
const fs = require('fs');
const { Transform } = require('stream');
const { stderr, exit, stdin, stdout } = require('process');

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

const config = grab('--config');
const input = grab('--input');
const output = grab('--output');

console.log(`config: ${config}`);
console.log(`input: ${input}`);
console.log(`output: ${output}`);

if (!config) handleError("config wasn't given");

const cipheringQueue = [];
debugger;
config.split('-').map((unit) => {
  switch (unit[0]) {
    case 'C':
      if (unit[1] !== '1' && unit[1] !== '0') handleError('wrong config was given');
      cipheringQueue.push(caesarCipher(+unit[1]));
      break;
    case 'A':
      if (unit[1]) handleError('wrong config was given');
      cipheringQueue.push(atbashCipher);
      break;
    case 'R':
      if (unit[1] !== '1' && unit[1] !== '0') handleError('wrong config was given');
      cipheringQueue.push(ROT8Cipher(+unit[1]));
      break;
    default:
      handleError('wrong config was given');
  }
});

if (input) {
  const readStream = fs.createReadStream(input, 'utf-8');

  readStream.on('error', (e) => handleError(e.message));

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const ciphered = cipheringQueue.reduce((prev, cur) => cur(prev), chunk.toString());
      this.push(ciphered);
      callback();
    },
  });

  readStream
    .pipe(transformStream)
    .on('error', (e) => handleError(e.message))
    .pipe(stdout)
    .on('error', (e) => handleError(e.message));
} else {
  let inputText;
  stdin.on('data', function (data) {
    inputText = data.toString();
    if (!output) stdout.write(inputText);
    exit(1);
  });
}

if (output) {
  fsPromises
    .readFile(output)
    .then(() => {
      console.log('cool output file found');
    })
    .catch((e) => {
      console.log(e.message);
      exit(1);
    });
}
