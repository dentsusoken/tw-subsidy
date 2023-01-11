import * as sha512 from 'js-sha512';
import * as algosdk from 'algosdk';

export const makeHash = (message: sha512.Message) => {
  return sha512.sha512_256.array(message);
};

export const makeSortedEntries = (o: object) => {
  const entries = Object.entries(o);

  return entries.sort((a, b) => (a[0] > b[0] ? 1 : -1));
};

export const makeLeafHashes = (o: object) => {
  const entries = makeSortedEntries(o);

  return entries.map((e) => makeHash(algosdk.encodeObj(e)));
};

export const makeParentHashes = (children: number[][]) => {
  const clen = children.length;
  const cmod = clen % 2;
  const carray = cmod ? [...children, children[clen - 1]] : children;

  if (clen < 2) {
    throw new Error('The number of children must be greater than 1');
  }

  const parent: number[][] = [];

  for (let i = 0; i < clen; i += 2) {
    const p = carray[i].concat(carray[i + 1]);
    const ph = makeHash(p);

    parent.push(ph);
  }

  return parent;
};
export const makeMerkleTree = (o: object) => {
  const leafHashes = makeLeafHashes(o);
  const tree: number[][][] = [];

  for (let hashes = leafHashes; ; hashes = makeParentHashes(hashes)) {
    tree.push(hashes);

    if (hashes.length == 1) {
      break;
    }
  }

  return tree;
};
