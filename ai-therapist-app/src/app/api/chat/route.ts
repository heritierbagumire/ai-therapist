import { NextResponse } from "next/server";
import { detect_sentiment, get_response } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "No text input provided" },
        { status: 400 }
      );
    }
    const sentiment_label = await detect_sentiment(text);
    const ai_response = get_response(text, sentiment_label);

    return NextResponse.json({ ai_response: ai_response, user_text: text });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error processing message: ${error.message}` },
      { status: 500 }
    );
  }
}