import {
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { aggregateResults } from './utils/analyzeImages/aggregateResults';
import { analyzeSingleImage } from './utils/analyzeImages/analyzeSingleImage';
import { filterValidResults } from './utils/analyzeImages/filterValidResults';
import { prepareAreaInputs } from './utils/analyzeImages/prepareAreaInputs';
import { buildImageAnalysisSummary } from './utils/analyzeImages/buildImageAnalysisSummary';
import { getBase64ImageFromUrl } from './utils/analyzeImage/getBase64ImageFromUrl';
import { createImageContents } from './utils/analyzeImage/createImageContents';
import { callGenerateContent } from './utils/analyzeImage/callGenerateContent';
import { parseGeneratedContent } from './utils/analyzeImage/parseGeneratedContent';
import { AiService } from '../ai/ai.service';
import { contentsText } from './constants/contentsText';

@Injectable()
export class WatchService {
  constructor(private AiService: AiService) {}

  async analyzeImages(imagePaths: string[]) {
    const MIN_QUALITY_THRESHOLD = 0.5;

    const results = await Promise.all(
      imagePaths.map((url) =>
        analyzeSingleImage.call(this, url, MIN_QUALITY_THRESHOLD),
      ),
    );

    const validResults = filterValidResults(results);
    const areaInputs = prepareAreaInputs(validResults);
    const aggregated = aggregateResults(areaInputs);

    return buildImageAnalysisSummary(imagePaths, validResults, aggregated);
  }

  async analyzeImage(imagePath: string) {
    try {
      const base64Image = await getBase64ImageFromUrl(imagePath);
      const contents = createImageContents(base64Image, contentsText);
      const rawContent = await callGenerateContent.call({ ai: this.AiService.ai }, 'gemini-2.5-flash', contents);
      const result = parseGeneratedContent(rawContent);

      return {
        ...result,
        generated_at: new Date().toISOString(),
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
