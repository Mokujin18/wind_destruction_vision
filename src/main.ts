import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new HttpException(
          {
            status: 422,
            message: 'Validation failed',
            success: false,
            meta: {
              details: errors.map(err => ({
                property: err.property,
                constraints: err.constraints,
              })),
            },
          },
          422,
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
