import { IMessageEntity } from './message-entity.interface';
import { IOrder } from './order.interface';

export interface IMockedMessageDB {
  messages: IMessageEntity[];
  orders: IOrder[];
}
