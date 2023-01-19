import { VerifiableMessage, VerifiableCredentialContent, VerifiableCredential } from '@/lib/algosbt/types';
import { ResidentInputFormType, AccountInputFormType } from "./inputForm"

export type baseType = {
    applicationDate: string;
    verifyStatus: boolean;
    approvalStatus: boolean;
}

export type SubsidyInputFormType = {
    id: number;
    resident: string;
    account: string;
    tax: string;
    fullName: string;
    address: string;
    residentVP: VerifiableMessage<VPContent> | undefined;
    accountVP: VerifiableMessage<VPContent> | undefined;
    taxVP: VerifiableMessage<VPContent> | undefined;
} & baseType;

export type TaxInputFormType = {
    id: number;
    applicationYear: string;
    corporationName: string;
    corporationAddress: string;
    fullName: string;
    address: string;
} & baseType;

export type VCListType = {
    resident: {
        VC: VerifiableMessage<VerifiableCredentialContent<ResidentInputFormType>>;
        acceptStatus: boolean;
    }[];
    account: {
        VC: VerifiableMessage<VerifiableCredentialContent<AccountInputFormType>>;
        acceptStatus: boolean;
    }[];
    tax: {
        VC: VerifiableMessage<VerifiableCredentialContent<TaxInputFormType>>;
        acceptStatus: boolean;
    }[];
}

export type VPContent = {
    credentials: VerifiableCredential[];
}