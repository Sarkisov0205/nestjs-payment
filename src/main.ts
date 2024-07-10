import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import pck from '../package.json';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .setVersion(pck.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  await SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
