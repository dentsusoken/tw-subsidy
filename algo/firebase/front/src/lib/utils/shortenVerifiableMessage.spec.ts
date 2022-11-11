import { expect } from 'chai';
import { VerifiableMessage } from '@/lib/algosbt/types';
import shotrenVerifiableMessage from './shortenVerifiableMessage';

describe('shotrenVerifiableMessage', () => {
  it('should work', () => {
    type MyName = {
      name: string;
    };

    const vm: VerifiableMessage<MyName> = {
      message: {
        senderDid: 'did:pkh:algo:abcdefghijklmnopqrstuvwxyz',
        receiverDid: 'did:pkh:algo:bcdefghijklmnopqrstuvwxyza',
        content: {
          name: 'Hoge',
        },
      },
      signature: 'cdefghijklmnopqrstuvwxyzab',
    };
    expect(shotrenVerifiableMessage(vm)).to.eql({
      message: {
        senderDid: 'did:pkh:algo:...uvwxyz',
        receiverDid: 'did:pkh:algo:...vwxyza',
        content: {
          name: 'Hoge',
        },
      },
      signature: 'cdefgh...wxyzab',
    });
  });
});
