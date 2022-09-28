import * as crypto from 'crypto';
import * as sha512 from 'js-sha512';
import * as pbkdf2 from 'pbkdf2';
import * as aesjs from 'aes-js';

import { keyPairFromSeed, randomBytes, seedFromSecretKey } from './naclUtils';

const ALGORITHM = 'aes-256-cbc';

export function genericHash(message: sha512.Message) {
  return sha512.sha512_256.array(message);
}

export const createKey = (password: string) => {
  const salt = Uint8Array.from(genericHash(password));

  return pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512');
};

export const encrypt = (data: Uint8Array, key: Uint8Array) => {
  const iv = randomBytes(16);

  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encBody = aesCbc.encrypt(aesjs.padding.pkcs7.pad(data));

  const ret = new Uint8Array(iv.length + encBody.length);
  ret.set(iv);
  ret.set(encBody, iv.length);

  return ret;
};

export const decrypt = (encData: Uint8Array, key: Uint8Array) => {
  const iv = encData.subarray(0, 16);
  const encBody = encData.subarray(16);

  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);

  return aesjs.padding.pkcs7.strip(aesCbc.decrypt(encBody));
};

export const encryptSeed = (seed: Uint8Array, password: string) => {
  const key = createKey(password);
  const iv = randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encBody = cipher.update(seed);

  return Buffer.concat([iv, encBody, cipher.final()]);
};

export const decryptSeed = (encData: Buffer, password: string) => {
  const key = createKey(password);
  const iv = encData.subarray(0, 16);
  const encBody = encData.subarray(16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decBody = decipher.update(encBody);

  return Uint8Array.from(Buffer.concat([decBody, decipher.final()]));
};

export const encryptByPassword = (data: string, password: string) => {
  const key = createKey(password);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encBody = cipher.update(Buffer.from(data));

  return Buffer.concat([iv, encBody, cipher.final()]).toString('base64');
};

export const decryptByPassword = (encData: string, password: string) => {
  const buf = Buffer.from(encData, 'base64');
  const key = createKey(password);
  const iv = buf.subarray(0, 16);
  const encBuf = buf.subarray(16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decBody = decipher.update(encBuf);

  return Buffer.concat([decBody, decipher.final()]).toString('utf8');
};

export const encryptBySecretKey = (data: string, secretKey: Uint8Array) => {
  const iv = crypto.randomBytes(16);
  const key = seedFromSecretKey(secretKey);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encBody = cipher.update(Buffer.from(data));

  return Buffer.concat([iv, encBody, cipher.final()]).toString('base64');
};

export const decryptBySecretKey = (encData: string, secretKey: Uint8Array) => {
  const buf = Buffer.from(encData, 'base64');
  const key = seedFromSecretKey(secretKey);
  const iv = buf.subarray(0, 16);
  const encBody = buf.subarray(16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decBody = decipher.update(encBody);

  return Buffer.concat([decBody, decipher.final()]).toString('utf8');
};

export const secretKeyFromEncSeed = (encData: Buffer, password: string) => {
  const seed = decryptSeed(encData, password);
  const keys = keyPairFromSeed(seed);

  return keys.secretKey;
};
