import { expect } from 'chai';

import splitIntoChunks from './splitIntoChunks';

describe('splitIntoChunks', () => {
  it('should work', () => {
    const arr = new Uint8Array(Array(32).keys());
    const ret = splitIntoChunks(arr, 1);

    expect(ret.length).to.eq(2);
    expect(ret[0].length).to.eq(16);
    expect(ret[0][0]).to.eql(new Uint8Array([0]));
    expect(ret[0][1]).to.eql(new Uint8Array([1]));
    expect(ret[0][2]).to.eql(new Uint8Array([2]));
    expect(ret[0][3]).to.eql(new Uint8Array([3]));
    expect(ret[0][4]).to.eql(new Uint8Array([4]));
    expect(ret[0][5]).to.eql(new Uint8Array([5]));
    expect(ret[0][6]).to.eql(new Uint8Array([6]));
    expect(ret[0][7]).to.eql(new Uint8Array([7]));
    expect(ret[0][8]).to.eql(new Uint8Array([8]));
    expect(ret[0][9]).to.eql(new Uint8Array([9]));
    expect(ret[0][10]).to.eql(new Uint8Array([10]));
    expect(ret[0][11]).to.eql(new Uint8Array([11]));
    expect(ret[0][12]).to.eql(new Uint8Array([12]));
    expect(ret[0][13]).to.eql(new Uint8Array([13]));
    expect(ret[0][14]).to.eql(new Uint8Array([14]));
    expect(ret[0][15]).to.eql(new Uint8Array([15]));

    expect(ret[1].length).to.eq(16);
    expect(ret[1][0]).to.eql(new Uint8Array([16]));
    expect(ret[1][1]).to.eql(new Uint8Array([17]));
    expect(ret[1][2]).to.eql(new Uint8Array([18]));
    expect(ret[1][3]).to.eql(new Uint8Array([19]));
    expect(ret[1][4]).to.eql(new Uint8Array([20]));
    expect(ret[1][5]).to.eql(new Uint8Array([21]));
    expect(ret[1][6]).to.eql(new Uint8Array([22]));
    expect(ret[1][7]).to.eql(new Uint8Array([23]));
    expect(ret[1][8]).to.eql(new Uint8Array([24]));
    expect(ret[1][9]).to.eql(new Uint8Array([25]));
    expect(ret[1][10]).to.eql(new Uint8Array([26]));
    expect(ret[1][11]).to.eql(new Uint8Array([27]));
    expect(ret[1][12]).to.eql(new Uint8Array([28]));
    expect(ret[1][13]).to.eql(new Uint8Array([29]));
    expect(ret[1][14]).to.eql(new Uint8Array([30]));
    expect(ret[1][15]).to.eql(new Uint8Array([31]));

    const ret2 = splitIntoChunks(arr);
    //console.log(JSON.stringify(ret, undefined, 2));
    //console.log(JSON.stringify(arr, undefined, 2));

    expect(ret2.length).to.eq(1);
    expect(ret2[0].length).to.eq(1);
    expect(ret2[0][0]).to.eql(arr);
  });
});
