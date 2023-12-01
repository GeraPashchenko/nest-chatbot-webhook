import { Module } from '@nestjs/common';
import { OpenaiApiModule } from 'src/openai-api/openai-api.module';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { MessageDBService } from './message-db.service';

@Module({
  imports: [OpenaiApiModule],
  providers: [WebhookService, MessageDBService],
  exports: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
