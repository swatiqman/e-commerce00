import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from './config/app.config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

function configureSwagger(
  appConfig: Partial<AppConfig>,
  app: INestApplication,
) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Smart Insurance')
    .setDescription('API docs for Smart Insurance Apps')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  const swaggerUiPath = '/docs';
  SwaggerModule.setup('docs', app, swaggerDoc);
  Logger.log(
    `Swagger Docs enabled: ${appConfig.domain}${swaggerUiPath}`,
    'NestApplication',
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { port, domain } = app.get<AppConfig>(appConfig.KEY);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  configureSwagger({ domain }, app);
  // const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${domain}/${globalPrefix}`);
}
bootstrap();
