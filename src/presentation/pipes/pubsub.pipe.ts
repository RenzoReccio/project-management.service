import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
export interface PubSubRequest {
  message: Message
  subscription: string
}

export interface Message {
  data: string
  messageId: string
  message_id: string
  publishTime: string
  publish_time: string
}

@Injectable()
export class PubSubPipe<T> implements PipeTransform<PubSubRequest, T> {
  constructor(private readonly type: new () => T) { }

  transform(value: PubSubRequest, metadata: ArgumentMetadata): T {
    var parsedObject = atob(value.message.data);

    const result = Object.assign(new this.type(), JSON.parse(parsedObject));
    return result;
  }
}