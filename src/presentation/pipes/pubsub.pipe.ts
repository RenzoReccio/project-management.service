import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PubSubRequest } from '../controllers/task.controller';

@Injectable()
export class PubSubPipe<T> implements PipeTransform<PubSubRequest, T> {
  constructor(private readonly type: new () => T) {}

  transform(value: PubSubRequest, metadata: ArgumentMetadata): T {
    var parsedObject = atob(value.message.data);

    const result = Object.assign(new this.type(), JSON.parse(parsedObject));
    return result;
  }
}