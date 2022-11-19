import { VerifiablePresentation } from '@/lib/algosbt/types';
import { shortenDid } from '../algosbt/utils/didUtils';
import shortenString from './shortenString';
import shotrenVerifiableMessage from './shortenVerifiableMessage';

const shotrenVerifiablePresentation = (vp: VerifiablePresentation) => {
  const short = JSON.parse(JSON.stringify(vp)) as VerifiablePresentation;

  short.message.senderDid = shortenDid(short.message.senderDid);
  short.message.receiverDid = shortenDid(short.message.receiverDid);
  short.signature = shortenString(short.signature);

  vp.message.content.credentials.forEach((vc, index) => {
    short.message.content.credentials[index] = shotrenVerifiableMessage(vc);
  });

  return short;
};

export default shotrenVerifiablePresentation;
