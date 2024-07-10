import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import pck from '../package.json';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.useGlobalInterceptors(
    // class transformer
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  const options = new DocumentBuilder()
    .setTitle(pck.name)
    .setDescription('Swagger api')
    .setVersion(pck.name)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  await SwaggerModule.setup('api', app, document);

  await app.init();
}
bootstrap();
