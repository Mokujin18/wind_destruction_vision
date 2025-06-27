import { Module } from '@nestjs/common';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { AiModule } from '../ai/ai.module';

@Module({
  providers: [WatchService],
  controllers: [WatchController],
  imports: [AiModule],
})
export class WatchModule {}
