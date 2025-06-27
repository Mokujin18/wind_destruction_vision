import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchModule } from './watch/watch.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [WatchModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
