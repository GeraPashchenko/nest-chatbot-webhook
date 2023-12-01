import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { APIPromise } from 'openai/core';
import { ChatCompletion } from 'openai/resources';
import { InputMessageDto } from 'src/classify/dto/input-message.dto';
import { MessageClassification } from 'src/classify/type/message-classification.enum';
import { IMessageEntity } from 'src/classify/type/message-entity.interface';

@Injectable()
export class OpenAiAPIService {
  private openAi: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get<string>('openaiApi.openapiKey'),
    });
  }

  async classifyMessage(messageDto: InputMessageDto): Promise<IMessageEntity> {
    const chatCompletition: APIPromise<ChatCompletion> =
      this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              "Classify the following user message as 'MAKE_ORDER', 'LEAVE_REVIEW', or 'CONNECT_WITH_AGENT'.",
          },
          {
            role: 'user',
            content: messageDto.message,
          },
        ],
        max_tokens: 4,
      });

    const completitionResult = await Promise.resolve(chatCompletition).catch(
      (error) => {
        console.error('Error while requesting from OpenAI:', error);
        throw error;
      },
    );

    const classification = completitionResult.choices[0].message.content;

    console.info(
      `[INFO] The message "${messageDto.message}" has been classified as "${classification}"`,
    );

    return {
      ...messageDto,
      classification: MessageClassification[classification],
    };
  }

  async validateSKU(orderSKU: string): Promise<string> {
    const chatCompletition: APIPromise<ChatCompletion> =
      this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Read the following user message, fine there an SKU and say they order is confirmed.`,
          },
          {
            role: 'user',
            content: orderSKU,
          },
        ],
        max_tokens: 4,
      });

    const completitionResult = await Promise.resolve(chatCompletition).catch(
      (error) => {
        console.error('Error while requesting from OpenAI:', error);
        throw new BadRequestException(error);
      },
    );

    const botAnswer = completitionResult.choices[0].message.content;

    return `Bot's answer to the order's message: "${orderSKU}" is "${botAnswer}"`;
  }
}
