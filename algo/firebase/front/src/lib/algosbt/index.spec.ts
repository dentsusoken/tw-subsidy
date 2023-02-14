import { expect } from 'chai';

import { decryptByPassword, encryptByPassword } from './utils/cryptUtils';
import { addressFromSecretKey } from './utils/algosdkUtils';
import { addressFromDid } from './utils/didUtils';
import { testNetAlgod as algod } from './algod/algods';
import deleteApp from './transactions/deleteApp';
import { test1Account, test2Account, test3Account } from './account/accounts';

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
    expect(didAccount.address).to.not.be.empty;
    expect(didAccount.encSecretKey).to.not.be.empty;

    const secretKey = decryptByPassword(
      Buffer.from(didAccount.encSecretKey, 'base64'),
      password
    );

    expect(addressFromSecretKey(secretKey)).to.eq(didAccount.address);
  });

  it('restoreDidAccount should work', () => {
    const password = 'abcdefgh';
    const didAccount = createDidAccount(password);

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

    const holderSecretKey = test1Account.sk;
    const issuerSecretKey = test2Account.sk;

    const holderEncSecretKey = Buffer.from(
      encryptByPassword(holderSecretKey, holderPassword)
    ).toString('base64');
    const issuerEncSecretKey = Buffer.from(
      encryptByPassword(issuerSecretKey, issuerPassword)
    ).toString('base64');

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

    const holderSecretKey = test1Account.sk;
    const issuerSecretKey = test2Account.sk;

    const holderEncSecretKey = Buffer.from(
      encryptByPassword(holderSecretKey, holderPassword)
    ).toString('base64');
    const issuerEncSecretKey = Buffer.from(
      encryptByPassword(issuerSecretKey, issuerPassword)
    ).toString('base64');

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
    const verifierPassword = '81234567';

    const holderSecretKey = test1Account.sk;
    const issuerSecretKey = test2Account.sk;
    const verifierSecretKey = test3Account.sk;

    const holderEncSecretKey = Buffer.from(
      encryptByPassword(holderSecretKey, holderPassword)
    ).toString('base64');
    const issuerEncSecretKey = Buffer.from(
      encryptByPassword(issuerSecretKey, issuerPassword)
    ).toString('base64');
    const verifierEncSecretKey = Buffer.from(
      encryptByPassword(verifierSecretKey, verifierPassword)
    ).toString('base64');

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );
    const verifierDidAccount = restoreDidAccount(
      verifierEncSecretKey,
      verifierPassword
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
    const verifierPassword = '81234567';

    const holderSecretKey = test1Account.sk;
    const issuerSecretKey = test2Account.sk;
    const verifierSecretKey = test3Account.sk;

    const holderEncSecretKey = Buffer.from(
      encryptByPassword(holderSecretKey, holderPassword)
    ).toString('base64');
    const issuerEncSecretKey = Buffer.from(
      encryptByPassword(issuerSecretKey, issuerPassword)
    ).toString('base64');
    const verifierEncSecretKey = Buffer.from(
      encryptByPassword(verifierSecretKey, verifierPassword)
    ).toString('base64');

    const holderDidAccount = restoreDidAccount(
      holderEncSecretKey,
      holderPassword
    );
    const issuerDidAccount = restoreDidAccount(
      issuerEncSecretKey,
      issuerPassword
    );
    const verifierDidAccount = restoreDidAccount(
      verifierEncSecretKey,
      verifierPassword
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
    const vc2 = await createVerifiableCredential(
      algod,
      issuerDidAccount,
      holderDid,
      content,
      issuerPassword
    );
    const appIndex = vc.message.content.appIndex;
    const appIndex2 = vc2.message.content.appIndex;

    console.log('Application Index:', appIndex);
    console.log('Application Index2:', appIndex2);

    try {
      const vp = await createVerifiablePresentation(
        holderDidAccount,
        verifierDidAccount.did,
        [vc, vc2],
        holderPassword
      );

      const result = await verifyVerifiablePresentation(algod, vp);

      expect(result).to.eql({
        vpVerified: true,
        vcsVerified: [true, true],
      });

      await revokeVerifiableCredential(
        algod,
        issuerDidAccount,
        vc2,
        issuerPassword
      );

      const result2 = await verifyVerifiablePresentation(algod, vp);

      expect(result2).to.eql({
        vpVerified: false,
        vcsVerified: [true, false],
      });
    } finally {
      await deleteApp(
        algod,
        {
          from: addressFromDid(issuerDidAccount.did),
          appIndex,
        },
        issuerSecretKey
      );
      await deleteApp(
        algod,
        {
          from: addressFromDid(issuerDidAccount.did),
          appIndex: appIndex2,
        },
        issuerSecretKey
      );
    }
  });
});
