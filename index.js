const fs = require('fs');
const { Transform } = require('stream');
const { stdin, stdout } = require('process');
const atbashCipher = require('./src/atbashCipher');
const caesarCipher = require('./src/caesarCipher');
const ROT8Cipher = require('./src/ROT8Cipher');
const { grab, handleError } = require('./src/utils');

const config = grab('--config');
const input = grab('--input');
const output = grab('--output');

if (!config) handleError("config wasn't given");

const cipheringQueue = [];
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

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const ciphered = cipheringQueue.reduce((prev, cur) => cur(prev), chunk.toString());
    this.push(ciphered);
    callback();
  },
});

let readStream;

if (input) {
  readStream = fs.createReadStream(input, 'utf-8');
} else {
  readStream = stdin;
}

readStream.on('error', (e) => handleError(e.message));

if (output) {
  readStream.pipe(transformStream).pipe(fs.createWriteStream(output, 'utf-8'));
} else {
  readStream.pipe(transformStream).pipe(stdout);
}
