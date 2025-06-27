import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export async function analyzeSingleImage(
  imageUrl: string,
  threshold = 0.5,
) {
  try {
    const result = await this.analyzeImage(imageUrl);

    const bestQuality = Math.max(...result.areas.map((a) => a.image_mark));
    if (bestQuality < threshold) return null;

    result.areas = result.areas.map((a) => ({ ...a, image_url: imageUrl }));
    return result;
  } catch (error) {
    if (error instanceof NotFoundException) throw new NotFoundException();
    throw new InternalServerErrorException();
  }
}
