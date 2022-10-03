export type EncAccount = {
  address: string;
  encSecretKey: Uint8Array;
};

export type SBTRequest<T> = {
  holderAddress: string;
  message: T;
  signature: Uint8Array;
};

export type SBT<T> = {
  holderAddress: string;
  issuerAddress: string;
  message: T;
  signature: Uint8Array;
};
