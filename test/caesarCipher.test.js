const { expect } = require('@jest/globals');
const caesarCipher = require('../src/caesarCipher');

describe('check caesar ciphering function', () => {
  const caesarEncode = caesarCipher(1);
  const caesarDecode = caesarCipher(0);
  const plainText = 'This TexT would be decoded with CAesar Cipher!';
  const decodedText = 'Sghr SdwS vntkc ad cdbncdc vhsg BZdrzq Bhogdq!';
  const mixedText = 'Это смешанный текст$%^ This is mixed text!@#';
  const mixedTextDecoded = 'Это смешанный текст$%^ Sghr hr lhwdc sdws!@#';

  test('should decode the text', () => {
    expect(caesarDecode(plainText)).toBe(decodedText);
  });

  test('should encode the decoded text', () => {
    expect(caesarEncode(decodedText)).toBe(plainText);
  });

  test('should decode only english letters', () => {
    expect(caesarDecode(mixedText)).toBe(mixedTextDecoded);
  });

  test('should return the same text on encoding the decoded text', () => {
    expect(caesarEncode(caesarDecode(mixedText))).toBe(mixedText);
  });
});
