import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: 'AIzaSyCDZm1wAMqjm1CMSghfOiZ83-N3Yrgo4q4',
    });
  }
}
