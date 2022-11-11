export type DidAccount = {
  did: string;
  address: string;
  encSecretKey: Uint8Array;
};

export type Message<T> = {
  senderDid: string;
  receiverDid: string;
  content: T;
};

export type VerifiableMessage<T> = {
  message: Message<T>;
  signature: string;
};

export type VerifiableCredentialContent<T> = {
  appIndex: number;
  content: T;
};

export type VerifiableCredential<T> = VerifiableMessage<
  VerifiableCredentialContent<T>
>;
