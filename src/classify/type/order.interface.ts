export interface IOrder {
  clientId: string; // uuid
  receiverId: string; // uuid
  orderId: string; // uuid
  botAnswer: string; // text answer from OpenAI API bot
}
