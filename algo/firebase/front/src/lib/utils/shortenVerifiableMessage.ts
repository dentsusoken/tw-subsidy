import { VerifiableMessage } from '@/lib/algosbt/types';
import { shortenDid } from '../algosbt/utils/didUtils';
import shortenString from './shortenString';

const shotrenVerifiableMessage = <T>(message: VerifiableMessage<T>) => {
  const shortMessage = JSON.parse(
    JSON.stringify(message)
  ) as VerifiableMessage<T>;

  shortMessage.message.senderDid = shortenDid(shortMessage.message.senderDid);
  shortMessage.message.receiverDid = shortenDid(
    shortMessage.message.receiverDid
  );
  shortMessage.signature = shortenString(shortMessage.signature);

  return shortMessage;
};

export default shotrenVerifiableMessage;
