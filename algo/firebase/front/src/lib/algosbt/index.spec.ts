import { expect } from 'chai';

import { decryptByPassword, encryptByPassword } from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { addressFromDid } from './utils/didUtils';
import { testNetAlgod as algod } from './algod/algods';
import deleteApp from './transactions/deleteApp';
import {
  holderAccount,
  issuerAccount,
  verifierDidAccount,
} from '../algo/account/accounts';

import {
  createDidAccount,
  restoreDidAccount,
  createVerifiableMessage,
  verifyVerifiableMessage,
  createVerifiableCredential,
  revokeVerifiableCredential,
  verifyVerifiableCredential,
  createVerifiablePresentation,
  verifyVerifiablePresentation,
} from '.';

describe('algosbt', () => {
  it('createDidAccount should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);

    expect(didAccount.did).to.not.be.empty;
    expect(didAccount.encSecretKey).to.not.be.empty;

    const secretKey = decryptByPassword(didAccount.encSecretKey, password);

    expect(addressFromSecretKey(secretKey)).to.eq(
      addressFromDid(didAccount.did)
    );
  });

  it('restoreDidAccount should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);

    expect(didAccount.did).to.not.be.empty;
    expect(didAccount.encSecretKey).to.not.be.empty;

    expect(restoreDidAccount(didAccount.encSecretKey, password)).to.eql(
      didAccount
    );
  });

  it('createVerifiableMessage should work', () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderDidAccount = createDidAccount(holderPassword);
    const issuerDidAccount = createDidAccount(issuerPassword);

    const content = {
      name: 'Yasuo',
    };

    const vm = createVerifiableMessage(
      holderDidAccount,
      issuerDidAccount.did,
      content,
      holderPassword
    );

    expect(vm.message.senderDid).to.eq(holderDidAccount.did);
    expect(vm.message.receiverDid).to.eq(issuerDidAccount.did);
    expect(vm.message.content).to.eql(content);
    expect(vm.signature).to.not.be.empty;
  });

  it('verifyVerifiableMessage should work', () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderDidAccount = createDidAccount(holderPassword);
    const issuerDidAccount = createDidAccount(issuerPassword);

    const content = {
      name: 'Yasuo',
    };

    const vm = createVerifiableMessage(
      holderDidAccount,
      issuerDidAccount.did,
      content,
      holderPassword
    );

    expect(verifyVerifiableMessage(vm)).to.be.true;
  });

  it('createVerifiableCredential should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVerifiableCredential(
      algod,
      issuerDidAccount,
      holderDid,
      content,
      issuerPassword
    );
    const appIndex = vc.message.content.appIndex;
    console.log('Application Index:', appIndex);

    await deleteApp(
      algod,
      {
        from: addressFromDid(issuerDidAccount.did),
        appIndex,
      },
      issuerSecretKey
    );

    expect(vc.message.senderDid).to.eq(issuerDidAccount.did);
    expect(vc.message.receiverDid).to.eq(holderDidAccount.did);
    expect(vc.message.content.content).to.eql(content);
    expect(vc.signature).to.not.be.empty;
  });

  it('verifyVerifiableCredential & revokeVerifiableCredential should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVerifiableCredential(
      algod,
      issuerDidAccount,
      holderDid,
      content,
      issuerPassword
    );
    const appIndex = vc.message.content.appIndex;
    console.log('Application Index:', appIndex);

    try {
      expect(await verifyVerifiableCredential(algod, vc)).to.be.true;

      await revokeVerifiableCredential(
        algod,
        issuerDidAccount,
        vc,
        issuerPassword
      );

      expect(await verifyVerifiableCredential(algod, vc)).to.be.false;
    } finally {
      await deleteApp(
        algod,
        {
          from: addressFromDid(issuerDidAccount.did),
          appIndex,
        },
        issuerSecretKey
      );
    }
  });

  it('createVerifiablePresentation should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVerifiableCredential(
      algod,
      issuerDidAccount,
      holderDid,
      content,
      issuerPassword
    );
    const appIndex = vc.message.content.appIndex;
    console.log('Application Index:', appIndex);

    try {
      const vp = await createVerifiablePresentation(
        holderDidAccount,
        verifierDidAccount.did,
        [vc],
        holderPassword
      );

      expect(vp.message.senderDid).to.eq(holderDidAccount.did);
      expect(vp.message.receiverDid).to.eq(verifierDidAccount.did);
      expect(vp.message.content.credentials).to.eql([vc]);
      expect(vp.signature).to.not.be.empty;
    } finally {
      await deleteApp(
        algod,
        {
          from: addressFromDid(issuerDidAccount.did),
          appIndex,
        },
        issuerSecretKey
      );
    }
  });

  it('verifyVerifiablePresentation should work', async () => {
    const holderPassword = 'abcdefgh';
    const issuerPassword = '12345678';

    const holderSecretKey = holderAccount.sk;
    const issuerSecretKey = issuerAccount.sk;

    const holderEncSecretKey = encryptByPassword(
      holderSecretKey,
      holderPassword
    );
    const issuerEncSecretKey = encryptByPassword(
      issuerSecretKey,
      issuerPassword
    );

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );

    const holderDid = holderDidAccount.did;

    const content = {
      name: 'Yasuo',
    };

    const vc = await createVerifiableCredential(
      algod,
      issuerDidAccount,
      holderDid,
      content,
      issuerPassword
    );
    const appIndex = vc.message.content.appIndex;
    console.log('Application Index:', appIndex);

    try {
      const vp = await createVerifiablePresentation(
        holderDidAccount,
        verifierDidAccount.did,
        [vc],
        holderPassword
      );

      expect(await verifyVerifiablePresentation(algod, vp)).to.be.true;
    } finally {
      await deleteApp(
        algod,
        {
          from: addressFromDid(issuerDidAccount.did),
          appIndex,
        },
        issuerSecretKey
      );
    }
  });
});
