import getFileFromUrl from './getFileFromUrl';

export async function getBase64ImageFromUrl(url: string): Promise<string> {
  const rawImage = await getFileFromUrl(url);
  return rawImage.toString('base64');
}
