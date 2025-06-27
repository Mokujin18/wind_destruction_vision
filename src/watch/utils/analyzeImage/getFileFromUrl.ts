import axios from 'axios';
import { NotFoundException } from '@nestjs/common';

export default async function getFileFromUrl(url: string) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    return response.data;
  } catch (error) {
    throw new NotFoundException(`Failed to fetch file from URL: ${url}`);
  }
}
