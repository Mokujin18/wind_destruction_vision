import { Test, TestingModule } from '@nestjs/testing';
import { WatchService } from './watch.service';

describe('Watch', () => {
  let provider: WatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchService],
    }).compile();

    provider = module.get<WatchService>(WatchService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
