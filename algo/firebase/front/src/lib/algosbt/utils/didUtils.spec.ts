import { expect } from 'chai';

import * as didUtils from './didUtils';

describe('didUtils', () => {
  it('didFromAddress should work', () => {
    expect(didUtils.didFromAddress('xxx')).to.eq('did:pkh:algo:xxx');
  });

  it('splitDid should work', () => {
    const pieces = didUtils.splitDid('did:pkh:algo:xxx');

    expect(pieces[0]).to.eq('did:pkh:algo:');
    expect(pieces[1]).to.eq('xxx');
  });

  it('addressFromDid should work', () => {
    expect(didUtils.addressFromDid('did:pkh:algo:xxx')).to.eq('xxx');
  });

  it('shortenDid should work', () => {
    expect(didUtils.shortenDid('did:pkh:algo:abcdefg')).to.eq(
      'did:pkh:algo:...bcdefg'
    );
  });
});
