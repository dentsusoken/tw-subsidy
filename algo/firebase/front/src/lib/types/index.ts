import { VerifiableCredential, VerifiableMessage } from '../algosbt/types';

/* eslint-disable unused-imports/no-unused-vars */
export type ErrorHandlerType = (error: unknown) => void;

export enum ChainType {
  MainNet = 'MainNet',
  TestNet = 'TestNet',
}

export type CertificateOfResidenceVCRequestContent = {
  purpose: string;
  address: string;
  name: string;
};

export type CertificateOfResidenceVCContent = {
  issueDate: string;
  address: string;
  name: string;
};

export type CertificateOfResidenceVCRequest =
  VerifiableMessage<CertificateOfResidenceVCRequestContent>;

export type CertificateOfResidenceVC =
  VerifiableCredential<CertificateOfResidenceVCContent>;

export type Unpromise<T extends Promise<unknown>> = T extends Promise<infer U>
  ? U
  : never;

export type Unarray<T extends Array<unknown>> = T extends Array<infer U>
  ? U
  : never;
