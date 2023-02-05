import { atom } from 'recoil';

import { AccountInputFormType } from '@/lib/types/mockApp/inputForm';
import { VerifiableMessage } from '@/lib/algosbt/types';
import persistAtom from '../persistAtom';
import { AccountVCRequestType } from '@/lib/types/mockApp';

export const accountVCRequestListState = atom<AccountVCRequestType[]>({
    key: 'accountVCRequestListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
