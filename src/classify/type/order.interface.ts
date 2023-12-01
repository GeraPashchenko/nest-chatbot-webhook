export interface IOrder {
  clientId: string; // uuid
  recieverId: string; // uuid
  orderId: string; // uuid
  botAnswer: string; // text answer from OpenAI API bot
}
