const { expect } = require('@jest/globals');
const atbashCipher = require('../src/atbashCipher');

describe('check atbash ciphering function', () => {
  const plainText = 'This TexT would be decoded with Atbash Cipher!';
  const decodedText = 'Gsrh GvcG dlfow yv wvxlwvw drgs Zgyzhs Xrksvi!';
  const mixedText = 'Это смешанный текст$%^ This is mixed text!@#';
  const mixedTextDecoded = 'Это смешанный текст$%^ Gsrh rh nrcvw gvcg!@#';

  test('should decode the plain text', () => {
    expect(atbashCipher(plainText)).toBe(decodedText);
  });

  test('twice decoded text should be the same', () => {
    expect(atbashCipher(atbashCipher(plainText))).toBe(plainText);
  });

  test('should not decode the non-english characters', () => {
    expect(atbashCipher(mixedText)).toBe(mixedTextDecoded);
  });
});
