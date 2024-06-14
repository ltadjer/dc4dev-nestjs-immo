import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  app.enableCors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
  // Add prefix /api
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
    ],
  });
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
