import { expect } from 'chai';
import algosdk from 'algosdk';

import * as merkleTreeUtils from './merkleTreeUtils';

describe('merkleTreeUtils', () => {
  it('makeHash should work', () => {
    expect(merkleTreeUtils.makeHash('aaa').length).to.eql(32);
  });

  it('makeSortedEntries should work', () => {
    const o = {
      aaa: 1,
      ddd: 4,
      bbb: {
        ccc: 2,
      },
    };
    expect(merkleTreeUtils.makeSortedEntries(o)).to.eql([
      ['aaa', 1],
      [
        'bbb',
        {
          ccc: 2,
        },
      ],
      ['ddd', 4],
    ]);
  });

  it('makeLeafHashes should work', () => {
    const o = {
      aaa: 1,
      bbb: 2,
    };
    const hash = merkleTreeUtils.makeHash(algosdk.encodeObj(['aaa', 1]));
    const hash2 = merkleTreeUtils.makeHash(algosdk.encodeObj(['bbb', 2]));

    expect(merkleTreeUtils.makeLeafHashes(o)).to.eql([hash, hash2]);
  });

  it('makeParentHashes should work', () => {
    const hash1 = merkleTreeUtils.makeHash(algosdk.encodeObj(['aaa', 1]));
    const hash2 = merkleTreeUtils.makeHash(algosdk.encodeObj(['bbb', 2]));
    const hash3 = merkleTreeUtils.makeHash(algosdk.encodeObj(['ccc', 3]));

    const hash1_2 = merkleTreeUtils.makeHash(hash1.concat(hash2));
    const hash3_3 = merkleTreeUtils.makeHash(hash3.concat(hash3));

    expect(merkleTreeUtils.makeParentHashes([hash1, hash2, hash3])).to.eql([
      hash1_2,
      hash3_3,
    ]);
    expect(merkleTreeUtils.makeParentHashes([hash1, hash2])).to.eql([hash1_2]);
  });

  it('makeMerkleTree should work', () => {
    const hash1 = merkleTreeUtils.makeHash(algosdk.encodeObj(['aaa', 1]));
    const hash2 = merkleTreeUtils.makeHash(algosdk.encodeObj(['bbb', 2]));
    const hash3 = merkleTreeUtils.makeHash(algosdk.encodeObj(['ccc', 3]));
    const hash4 = merkleTreeUtils.makeHash(algosdk.encodeObj(['ddd', 4]));
    const hash5 = merkleTreeUtils.makeHash(algosdk.encodeObj(['eee', 5]));

    const hash1_2 = merkleTreeUtils.makeHash(hash1.concat(hash2));
    const hash3_4 = merkleTreeUtils.makeHash(hash3.concat(hash4));
    const hash5_5 = merkleTreeUtils.makeHash(hash5.concat(hash5));

    const hash1_2_3_4 = merkleTreeUtils.makeHash(hash1_2.concat(hash3_4));
    const hash5_5_5_5 = merkleTreeUtils.makeHash(hash5_5.concat(hash5_5));

    const hash1_2_3_4_5_5_5_5 = merkleTreeUtils.makeHash(
      hash1_2_3_4.concat(hash5_5_5_5)
    );

    const o = {
      aaa: 1,
      bbb: 2,
      ccc: 3,
      ddd: 4,
      eee: 5,
    };

    expect(merkleTreeUtils.makeMerkleTree(o)).to.eql([
      [hash1, hash2, hash3, hash4, hash5],
      [hash1_2, hash3_4, hash5_5],
      [hash1_2_3_4, hash5_5_5_5],
      [hash1_2_3_4_5_5_5_5],
    ]);
  });
});
