import { atom } from 'recoil';

import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage, VerifiableCredentialContent } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';

export const accountVCListState = atom<VerifiableMessage<VerifiableCredentialContent<AccountInputFormType>>[]>({
    key: 'accountVCListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
