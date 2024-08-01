import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PresentationModule } from './presentation/presentation.module';

async function bootstrap() {

  const app = await NestFactory.create(PresentationModule);

  app.enableCors({origin: process.env.ORIGIN});
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
