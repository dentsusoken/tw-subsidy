export type EncAccount = {
  address: string;
  encSecretKey: Uint8Array;
};

export type SBTRequest<T> = {
  holderAddress: string;
  message: T;
  signature: Uint8Array;
};

export type SBTMessage<T> = {
  holderAddress: string;
  appIndex: number;
  content: T;
};

export type SBT<T> = {
  issuerAddress: string;
  message: SBTMessage<T>;
  signature: Uint8Array;
};
