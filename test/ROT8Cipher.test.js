const { expect } = require('@jest/globals');
const ROT8Cipher = require('../src/ROT8Cipher');

describe('check rot8 ciphering function', () => {
  const rot8Encode = ROT8Cipher(1);
  const rot8Decode = ROT8Cipher(0);
  const plainText = 'This TexT would be decoded with ROT8 Cipher!';
  const decodedText = 'Lzak LwpL ogmdv tw vwugvwv oalz JGL8 Uahzwj!';
  const mixedText = 'Это смешанный текст$%^ This is mixed text!@#';
  const mixedTextDecoded = 'Это смешанный текст$%^ Lzak ak eapwv lwpl!@#';

  test('should decode the text', () => {
    expect(rot8Decode(plainText)).toBe(decodedText);
  });

  test('should encode the decoded text', () => {
    expect(rot8Encode(decodedText)).toBe(plainText);
  });

  test('should decode only english letters', () => {
    expect(rot8Decode(mixedText)).toBe(mixedTextDecoded);
  });

  test('should return the same text on encoding the decoded text', () => {
    expect(rot8Encode(rot8Decode(mixedText))).toBe(mixedText);
  });
});
