import { parse } from 'did-resolver';

export const tryDidjwt = async () => {
  console.log(parse('did:pkh:algo:1234'));
  console.log(parse('did:algo:1234'));
};
