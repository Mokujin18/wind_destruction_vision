export async function callGenerateContent(model: string, contents: any): Promise<string> {
  const response = await this.ai.models.generateContent({ model, contents });
  return response.text as string;
}
