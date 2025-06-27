import extractJsonBlock from './extractJsonBlock';

export function parseGeneratedContent(Content: string) {
  const cleanedText = extractJsonBlock(Content);
  return JSON.parse(cleanedText);
}
