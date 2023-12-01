import { InputMessageDto } from '../dto/input-message.dto';

export interface IOrderInput extends InputMessageDto {
  botAnswer: string;
  messageId: string;
}
