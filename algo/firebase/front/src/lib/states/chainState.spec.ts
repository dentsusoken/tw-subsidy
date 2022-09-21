import { expect } from 'chai';
import { snapshot_UNSTABLE } from 'recoil';
import chainState from './chainState';
import { ChainType } from '@/lib/types';

describe('chainState', () => {
  it('get should work', () => {
    const snapshot = snapshot_UNSTABLE();

    expect(snapshot.getLoadable(chainState).getValue()).to.equal(
      ChainType.TestNet
    );
  });

  it('set should work', () => {
    const snapshot = snapshot_UNSTABLE(({ set }) =>
      set(chainState, ChainType.MainNet)
    );

    expect(snapshot.getLoadable(chainState).getValue()).to.equal(
      ChainType.MainNet
    );
  });
});
