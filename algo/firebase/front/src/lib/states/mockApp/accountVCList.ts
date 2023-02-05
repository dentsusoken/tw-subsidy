import { atom } from 'recoil';

import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';
import { AccountVCType } from '@/lib/types/mockApp';

export const accountVCListState = atom<AccountVCType[]>({
    key: 'accountVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
