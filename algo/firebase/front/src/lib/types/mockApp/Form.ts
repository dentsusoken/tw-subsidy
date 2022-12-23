export type baseType ={
    did: string;
    applicationDate: string;
    verifyStatus: boolean;
    approvalStatus: boolean;
}

export type SubsidyInputFormType = {
    id: number;
    resident: boolean;
    account: boolean;
    tax: boolean;
    fullName: string;
    address: string;
} & baseType;

export type TaxInputFormType = {
    id: number;
    applicationYear: string;
    corporationName: string;
    corporationAddress: string;
    fullName: string;
    address: string;
} & baseType;