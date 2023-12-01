import { OpenAiAPIService } from 'src/openai-api/openai-api.service';
import { InputMessageDto } from './dto/input-message.dto';
import { Injectable } from '@nestjs/common';
import { MessageDBService } from './message-db.service';
import { IMessageEntity } from './type/message-entity.interface';
import { MessageClassification } from './type/message-classification.enum';
import { IOrder } from './type/order.interface';
import { IOrderInput } from './type/order-input.interface.dto';

@Injectable()
export class WebhookService {
  constructor(
    private readonly openAIAPIService: OpenAiAPIService,
    private readonly messageDbService: MessageDBService,
  ) {}

  async classify(messageDto: InputMessageDto): Promise<IMessageEntity> {
    const classifiedMessage = await this.openAIAPIService.classifyMessage(
      messageDto,
    );

    return this.messageDbService.storeMessage(classifiedMessage);
  }

  logMesage(messageInput: IMessageEntity) {
    const replMessageObject = {
      [MessageClassification.CONNECT_WITH_AGENT]: 'Thank you for your mesage!',
      [MessageClassification.LEAVE_REVIEW]: 'Thank you for your mesage!',
      [MessageClassification.MAKE_ORDER]: 'Please, provide an order SKU',
    };

    const logMessage = `
      Message received: ${messageInput.message},
      Message qualification: ${messageInput.classification},
      Message reply: ${replMessageObject[messageInput.classification]},
    `;

    console.info(logMessage);

    return logMessage;
  }

  async orderItem(messageDto: IOrderInput): Promise<IOrder> {
    const skuAnswer = await this.openAIAPIService.validateSKU(
      messageDto.message,
    );

    messageDto.botAnswer = skuAnswer;

    return this.messageDbService.storeOrder(messageDto);
  }
}
