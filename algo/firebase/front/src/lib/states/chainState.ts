import { atom } from 'recoil';
import { ChainType } from '@/lib/types';

const chainState = atom<ChainType>({
  key: 'ChainState',
  default: ChainType.TestNet,
});

export default chainState;
