import { expect } from 'chai';
import {
  VerifiableCredential,
  VerifiablePresentation,
} from '@/lib/algosbt/types';
import shotrenVerifiablePresentation from './shortenVerifiablePresentation';

describe('shotrenVerifiablePresentation', () => {
  it('should work', () => {
    type MyName = {
      name: string;
    };

    const vc: VerifiableCredential<MyName> = {
      message: {
        senderDid: 'did:pkh:algo:abcdefghijklmnopqrstuvwxyz',
        receiverDid: 'did:pkh:algo:bcdefghijklmnopqrstuvwxyza',
        content: {
          appIndex: 1,
          content: {
            name: 'hoge',
          },
        },
      },
      signature: 'cdefghijklmnopqrstuvwxyzab',
    };
    const vp: VerifiablePresentation = {
      message: {
        senderDid: 'did:pkh:algo:defghijklmnopqrstuvwxyzabc',
        receiverDid: 'did:pkh:algo:efghijklmnopqrstuvwxyzabcd',
        content: {
          credentials: [vc],
        },
      },
      signature: 'fghijklmnopqrstuvwxyzabcde',
    };

    const shortvp: VerifiablePresentation = {
      message: {
        senderDid: 'did:pkh:algo:def...abc',
        receiverDid: 'did:pkh:algo:efg...bcd',
        content: {
          credentials: [
            {
              message: {
                senderDid: 'did:pkh:algo:abc...xyz',
                receiverDid: 'did:pkh:algo:bcd...yza',
                content: {
                  appIndex: 1,
                  content: {
                    name: 'hoge',
                  },
                },
              },
              signature: 'cdefgh...wxyzab',
            },
          ],
        },
      },
      signature: 'fghijk...zabcde',
    };

    expect(shotrenVerifiablePresentation(vp)).to.eql(shortvp);
  });
});
