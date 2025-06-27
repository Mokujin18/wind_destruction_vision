export default function extractJsonBlock(text: string): string {
  const codeBlockRe = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = text.match(codeBlockRe);

  if (match && match[1]) {
    return match[1].trim();
  }

  return text.trim();
}