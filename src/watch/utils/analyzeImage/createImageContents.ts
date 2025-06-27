export function createImageContents(base64Image: string, contentsText: string) {
  return [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    },
    {
      text: contentsText,
    },
  ];
}
