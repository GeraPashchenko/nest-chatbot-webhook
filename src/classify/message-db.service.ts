import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IMessageEntity } from './type/message-entity.interface';
import { randomUUID } from 'crypto';
import { InputMessageDto } from './dto/input-message.dto';
import { IMockedMessageDB } from './type/message-db-mocked.interface';
import { IOrder } from './type/order.interface';
import { IOrderInput } from './type/order-input.interface.dto';

@Injectable()
export class MessageDBService {
  private messagesDB: IMockedMessageDB = { messages: [], orders: [] };

  /**
   * Check if the message exists
   * @param messageInput - WebRequestDto or a messageId search param
   * @returns boolean
   */
  private checkMessageExists(messageInput: InputMessageDto | string): boolean {
    if (typeof messageInput === 'string')
      return this.messagesDB.messages.some(
        (m: IMessageEntity) => m.messageId === messageInput,
      );

    const { clientId, receiverId } = messageInput;

    return this.messagesDB.messages.some(
      (m: IMessageEntity) =>
        m.clientId === clientId && m.receiverId === receiverId,
    );
  }

  private checkOrderExists(messageInput: InputMessageDto): boolean {
    const { clientId, receiverId } = messageInput;

    return this.messagesDB.orders.some(
      (o) => o.clientId === clientId && o.receiverId === receiverId,
    );
  }

  storeMessage(messageDto: InputMessageDto): IMessageEntity {
    const messageExists = this.checkMessageExists(messageDto);

    if (messageExists) return;

    const processedMessage = {
      ...messageDto,
      messageId: randomUUID(),
    };

    this.messagesDB.messages.push(processedMessage);

    return processedMessage;
  }

  storeOrder(messageDto: IOrderInput): IOrder {
    const messageExists = this.checkMessageExists(messageDto);
    const orderExists = this.checkOrderExists(messageDto);

    if (orderExists || !messageExists)
      throw new UnprocessableEntityException('Unprocessable Order');

    const processedOrder = {
      ...messageDto,
      botAnswer: messageDto.botAnswer,
      orderId: randomUUID(),
    };

    this.messagesDB.orders.push(processedOrder);

    return processedOrder;
  }

  getMessageById(messageId: string): IMessageEntity {
    const messageExists = this.checkMessageExists(messageId);

    if (!messageExists) throw new BadRequestException('Message does not exist');

    return this.messagesDB.messages.find((m) => m.messageId === messageId);
  }
}
