export type DidAccount = {
  did: string;
  address: string;
  encSecretKey: Uint8Array;
};

export type VCRequest<T> = {
  holderDid: string;
  message: T;
  signature: Uint8Array;
};

export type VCMessage<T> = {
  holderDid: string;
  appIndex: number;
  content: T;
};

export type VC<T> = {
  issuerDid: string;
  message: VCMessage<T>;
  signature: Uint8Array;
};
