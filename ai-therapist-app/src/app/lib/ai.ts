import { pipeline } from "@huggingface/transformers";

const sentiment_pipeline = await pipeline("sentiment-analysis");

export async function detect_sentiment(text: string) {
  try {
    const result = await sentiment_pipeline(text);
    return result[0].label;
  } catch (error: any) {
    console.error(`Error on sentiment analysis`, error);
    return "NEUTRAL";
  }
}

export function get_response(text: string, sentiment_label: string) {
  if (text.toLowerCase().includes("happy") || sentiment_label == "POSITIVE") {
    return "That's wonderful to hear! How has your day been?";
  } else if (text.toLowerCase().includes("sad") || sentiment_label == "NEGATIVE") {
    return "I'm sorry to hear that. Is there anything you'd like to talk about?";
  } else if (text.toLowerCase().includes("angry")) {
    return "It's understandable to feel angry sometimes. Would you like to explain how you feel?";
  } else {
    return "I hear you, how can I help?";
  }
}