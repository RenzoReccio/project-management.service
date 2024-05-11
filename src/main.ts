import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './presentation/presentation.module';

async function bootstrap() {
  const app = await NestFactory.create(PresentationModule);
  await app.listen(3000);
}
bootstrap();
