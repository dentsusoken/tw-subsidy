import * as sha512 from 'js-sha512';
import * as algosdk from 'algosdk';

type HashType = number[];

export const makeHash = (message: sha512.Message): HashType => {
  return sha512.sha512_256.array(message);
};

export const makeSortedEntries = (o: object) => {
  const entries = Object.entries(o);

  return entries.sort((a, b) => (a[0] > b[0] ? 1 : -1));
};

export const makeLeafHashes = (o: object): HashType[] => {
  const entries = makeSortedEntries(o);

  return entries.map((e) => makeHash(algosdk.encodeObj(e)));
};

export const makeParentHashes = (children: HashType[]): HashType[] => {
  const clen = children.length;
  const cmod = clen % 2;
  const carray = cmod ? [...children, children[clen - 1]] : children;

  if (clen < 2) {
    throw new Error('The number of children must be greater than 1');
  }

  const parent: HashType[] = [];

  for (let i = 0; i < clen; i += 2) {
    const p = carray[i].concat(carray[i + 1]);
    const ph = makeHash(p);

    parent.push(ph);
  }

  return parent;
};

export const makeMerkleTree = (o: object): HashType[][] => {
  const leafHashes = makeLeafHashes(o);
  const tree: HashType[][] = [];

  for (let hashes = leafHashes; ; hashes = makeParentHashes(hashes)) {
    tree.push(hashes);

    if (hashes.length == 1) {
      break;
    }
  }

  return tree;
};

export const hashEquals = (hash1: HashType, hash2: HashType): boolean => {
  const len1 = hash1.length;

  if (len1 !== hash2.length) {
    return false;
  }

  for (let i = 0; i < len1; i += 1) {
    if (hash1[i] !== hash2[i]) {
      return false;
    }
  }

  return true;
}

export const findHashIndex = (hashes: HashType[], hash: HashType): number => {
  return hashes.findIndex((value) => hashEquals(value, hash))


cp
}
