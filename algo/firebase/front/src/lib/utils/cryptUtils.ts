import * as crypto from 'crypto';

import { seedFromSecretKey } from './naclUtils';

const ALGORITHM = 'aes-256-cbc';

export const createSalt = (password: string) => {
  const sha256 = crypto.createHash('sha256');
  const sha512 = crypto.createHash('sha512');

  sha512.update(password);
  const sha512Hash = sha512.digest();

  sha256.update(sha512Hash);

  return sha256.digest();
};

export const createKey = (password: string) => {
  const salt = createSalt(password);

  return crypto.scryptSync(password, salt, 32);
};

export const encryptByPassword = (data: string, password: string) => {
  const key = createKey(password);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encBuf = cipher.update(Buffer.from(data));

  return Buffer.concat([iv, encBuf, cipher.final()]).toString('base64');
};

export const decryptByPassword = (encData: string, password: string) => {
  const buf = Buffer.from(encData, 'base64');
  const key = createKey(password);
  const iv = buf.subarray(0, 16);
  const encBuf = buf.subarray(16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decBuf = decipher.update(encBuf);

  return Buffer.concat([decBuf, decipher.final()]).toString('utf8');
};

export const encryptBySecretKey = (data: string, secretKey: Uint8Array) => {
  const iv = crypto.randomBytes(16);
  const key = seedFromSecretKey(secretKey);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encBuf = cipher.update(Buffer.from(data));

  return Buffer.concat([iv, encBuf, cipher.final()]).toString('base64');
};

export const decryptBySecretKey = (encData: string, secretKey: Uint8Array) => {
  const buf = Buffer.from(encData, 'base64');
  const key = seedFromSecretKey(secretKey);
  const iv = buf.subarray(0, 16);
  const encBuf = buf.subarray(16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  const decBuf = decipher.update(encBuf);

  return Buffer.concat([decBuf, decipher.final()]).toString('utf8');
};
