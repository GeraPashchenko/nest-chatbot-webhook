import { Module } from '@nestjs/common';
import { OpenAiAPIService } from './openai-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OpenAiAPIService],
  exports: [OpenAiAPIService],
})
export class OpenaiApiModule {}
