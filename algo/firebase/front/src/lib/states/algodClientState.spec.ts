import { expect } from 'chai';
import { snapshot_UNSTABLE } from 'recoil';
import algodClientState, {
  mainNetClient,
  testNetClient,
} from './algodClientState';
import chainState from './chainState';
import { ChainType } from '@/lib/types';

describe('algodClientState', () => {
  it('get should work', () => {
    const snapshot = snapshot_UNSTABLE();

    expect(snapshot.getLoadable(algodClientState).getValue()).to.equal(
      testNetClient
    );
  });

  it('set should work', () => {
    const snapshot = snapshot_UNSTABLE(({ set }) =>
      set(chainState, ChainType.MainNet)
    );

    expect(snapshot.getLoadable(algodClientState).getValue()).to.equal(
      mainNetClient
    );
  });

  it('testAlgodClient should work', async () => {
    expect(await testNetClient.status().do()).to.not.be.empty;
  }, 5000);
});
