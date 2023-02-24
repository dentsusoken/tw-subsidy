import { describe, it, expect } from 'vitest';

import * as u8a from 'uint8arrays';
import * as didJwtKit from 'did-jwt-toolkit';

import * as cryptUtils from '../utils/cryptUtils';
import { test1Account } from '../algo/account/secrets';
import { testNetAlgod as algod } from '../algo/algod/algods';
import deleteApp from '../algo/api/deleteApp';

import * as didvc from '.';

const driver = didJwtKit.getDIDKeyDriver('EdDSA');
const pw = '1234567';

describe('didvc', () => {
  it('encryptSecretKey should work', () => {
    const { secretKey } = driver.generateKeyPair();
    const encryptSecretKeyBase64URL = didvc.encryptSecretKey(secretKey, pw);

    const encryptSecretKey = u8a.fromString(
      encryptSecretKeyBase64URL,
      'base64url'
    );

    const secretKey2 = cryptUtils.decryptByPassword(encryptSecretKey, pw);

    expect(secretKey).toEqual(secretKey2);
  });

  it('decryptSecretKey should work', () => {
    const { secretKey } = driver.generateKeyPair();
    const encryptSecretKeyBase64URL = didvc.encryptSecretKey(secretKey, pw);

    const secretKey2 = didvc.decryptSecretKey(encryptSecretKeyBase64URL, pw);

    expect(secretKey).toEqual(secretKey2);
  });

  it('verifyCredentialStatus should work', async () => {
    const appIndex = await didvc.createRevokedApp(algod, test1Account.sk);

    try {
      console.log('Application Index:', appIndex);

      expect(await didvc.verifyCredentialStatus(algod, appIndex)).toBeTruthy();

      await didvc.setRevoked(algod, { appIndex, value: 1 }, test1Account.sk);

      expect(await didvc.verifyCredentialStatus(algod, appIndex)).toBeFalsy();
    } finally {
      await deleteApp(algod, appIndex, test1Account.sk);
    }
  });
});
