import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { InputMessageDto } from './dto/input-message.dto';
import { IOrderInput } from './type/order-input.interface.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('classify')
  async classifyMessage(@Body() dto: InputMessageDto) {
    const classifiedMessage = await this.webhookService.classify(dto);
    return this.webhookService.logMesage(classifiedMessage);
  }

  @Post('order')
  async orderItem(@Body() body: IOrderInput) {
    return this.webhookService.orderItem(body);
  }
}
