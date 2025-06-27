import { Body, Controller, Post } from '@nestjs/common';
import AnalyzeDto from './dto/analyze.dto';
import { WatchService } from './watch.service';

@Controller('watch')
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @Post('/analyze')
  analyze(@Body() analyzeDto: AnalyzeDto) {
    return this.watchService.analyzeImages(analyzeDto.images);
  }
}
