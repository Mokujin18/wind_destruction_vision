import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';

export default class AnalyzeDto {
  @IsNotEmpty()
  @IsString()
  claim_id: string;
  @IsNotEmpty()
  @IsString()
  loss_type: string;
  @IsNotEmpty()
  @ArrayMaxSize(100)
  @ArrayMinSize(1)
  images: string[];
}
