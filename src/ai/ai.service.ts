import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import * as process from 'node:process';

@Injectable()
export class AiService {
  ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.AI_API_KEY,
    });
  }
}
