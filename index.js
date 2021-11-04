const atbashCipher = require('./src/atbashCipher');
const caesarCipher = require('./src/caesarCipher');
const ROT8Cipher = require('./src/ROT8Cipher');
const fs = require('fs/promises');
const { stderr, exit, stdin, stdout } = require('process');
const readline = require('readline');

const grab = (fullFlag) => {
  const fullFlagIndex = process.argv.indexOf(fullFlag);
  const shortFlagIndex = process.argv.indexOf(fullFlag.slice(1, 3));

  if (
    (fullFlagIndex !== -1 && fullFlagIndex !== process.argv.lastIndexOf(fullFlag)) ||
    (shortFlagIndex !== -1 && shortFlagIndex !== process.argv.lastIndexOf(fullFlag.slice(1, 3))) ||
    (shortFlagIndex !== -1 && fullFlagIndex !== -1)
  ) {
    stderr.write(`${fullFlag.slice(2)} was duplicated`);
    exit(1);
  }

  if (fullFlagIndex !== -1) return process.argv[fullFlagIndex + 1];
  else if (shortFlagIndex !== -1) return process.argv[shortFlagIndex + 1];
  return false;
};

const config = grab('--config');
const input = grab('--input');
const output = grab('--output');

console.log(`config: ${config}`);
console.log(`input: ${input}`);
console.log(`output: ${output}`);

if (!config) {
  stderr.write('wrong config was given');
  exit(1);
}

let inputText;

if (input) {
  fs.readFile(input)
    .then((data) => {
      inputText = data;
      console.log('cool input file found');
    })
    .catch((e) => {
      console.log(e.message);
      exit(1);
    });
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Ask me something : ', function (answer) {
    inputText = answer;
    process.exit();
  });
  // process.stdin.setEncoding('utf8');
  // process.stdin.on('readable', () => {
  //   const chunk = process.stdin.read();
  //   if (chunk !== null) {
  //     process.stdout.write(`data: ${chunk}`);
  //   }
  // });
  // process.stdin.on('end', () => {
  //   process.stdout.write('end');
  // });

  // stdin.on('data', (data) => {
  //   inputText = data.toString();
  //   exit(1);
  // });
}

config.split('-').map((unit) => {
  switch (unit[0]) {
    case 'C':
      break;
    case 'A':
      break;
    case 'R':
      break;
    default:
      stderr.write('wrong config was given');
      exit(1);
  }
});

if (output) {
  fs.readFile(output)
    .then(() => {
      console.log('cool output file found');
    })
    .catch((e) => {
      console.log(e.message);
      exit(1);
    });
} else {
  stdout.write(inputText);
}
