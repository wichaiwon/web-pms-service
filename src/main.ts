import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { GlobalResponseInterceptor } from './common/interceptors/global-response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  
  const config = new DocumentBuilder()
    .setTitle('Web PMS Service API')
    .setDescription('API documentation for Web PMS Service')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 8080
  await app.listen(port)
}
bootstrap();
