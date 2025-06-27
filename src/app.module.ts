import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchModule } from './watch/watch.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WatchModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
