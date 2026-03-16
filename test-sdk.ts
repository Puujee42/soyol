import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: "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",
});

async function main() {
  try {
    const result = await streamText({
      model: openrouter.chat('deepseek/deepseek-chat'),
      messages: [
        { role: 'user', content: 'Сайн байна уу' },
        { role: 'assistant', content: 'Сайн байна уу! Юугаар туслах вэ?' },
        { role: 'user', content: 'Танай дэлгүүрт юу юу зардаг вэ?' }
      ]
    });
    
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("ERROR", e.message);
    } else {
      console.error("An unknown error occurred", e);
    }
  }
}

main();
