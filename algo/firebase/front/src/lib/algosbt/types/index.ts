export type DidAccount = {
  did: string;
  address: string;
  encSecretKey: Uint8Array;
};

export type Message<T = any> = {
  senderDid: string;
  receiverDid: string;
  content: T;
};

export type VerifiableMessage<T = any> = {
  message: Message<T>;
  signature: string;
};

export type VerifiableCredentialContent<T = any> = {
  appIndex: number;
  content: T;
};

export type VerifiablePresentationContent = {
  credentials: VerifiableCredential[];
};

export type VerifiableCredential<T = any> = VerifiableMessage<
  VerifiableCredentialContent<T>
>;

export type VerifiablePresentation =
  VerifiableMessage<VerifiablePresentationContent>;
