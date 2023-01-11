import { atom } from 'recoil';

import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';

export const accountVCRequestListState = atom<VerifiableMessage<AccountInputFormType>[]>({
    key: 'accountVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
