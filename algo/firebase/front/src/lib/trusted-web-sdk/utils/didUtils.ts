export const ID_PREFIX = 'did:twalgo:';

export const idFromAddress = (address: string) => {
  return `${ID_PREFIX}${address}`;
};

export const addressFromID = (id: string) => {
  if (!id.startsWith(ID_PREFIX)) {
    throw new Error(`ID(${id}) does not start with ${ID_PREFIX}`);
  }

  return id.slice(ID_PREFIX.length);
};
