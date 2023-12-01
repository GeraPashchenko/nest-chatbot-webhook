import { MessageClassification } from './message-classification.enum';

export interface IMessageEntity {
  messageId?: string; // uuid
  classification?: MessageClassification;
  timestamp: number;
  message: string;
  clientId: string; // uuid
  receiverId: string; // uuid
}
