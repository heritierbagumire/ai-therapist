import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const result = await streamText({
      model: openai('gpt-4o'),
      system: 'You are a friendly assistant.',
      prompt: 'Say hello in a friendly way.',
      maxTokens: 50,
    });

    // Use a type assertion if you're sure the stream property exists
    const streamResult = result as { stream: ReadableStream };

    if (streamResult && streamResult.stream) {
      const reader = streamResult.stream.getReader();
      let output = '';
      let done = false;

      // Read chunks from the stream
      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        if (value) {
          output += new TextDecoder().decode(value);
        }
      }

      return NextResponse.json({ success: true, content: output });
    } else {
      throw new Error('StreamTextResult does not contain a stream.');
    }
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}